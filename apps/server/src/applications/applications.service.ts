import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from 'src/database/entities/department.entity';
import { Project } from 'src/database/entities/project.entity';
import { Application } from 'src/database/entities/application.entity';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { CreatePayload } from './applications.controller';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApplicationsService {
  private projectManagerRole: Role;

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private roles: Repository<Role>,
    @InjectRepository(Department) private departments: Repository<Department>,
    @InjectRepository(Project) private projects: Repository<Project>,
    @InjectRepository(Application)
    private applications: Repository<Application>,

    private userService: UserService,
  ) {
    this.roles
      .findOne({ where: { name: 'ProjectManager' } })
      .then((role) => (this.projectManagerRole = role));
  }

  public async getAll() {
    return this.applications.find();
  }

  public async create(
    id: string,
    {
      employee: employeeUsername,
      departmentId,
      projectId,
      hours,
      weekId,
    }: CreatePayload,
  ) {
    const creator = await this.users.findOne({ where: { id } });
    const employee = await this.users.findOne({
      where: { username: employeeUsername },
    });

    const department = await this.departments.findOne({
      where: { id: departmentId },
    });

    const project = await this.projects.findOne({ where: { id: projectId } });

    const application = this.applications.create({
      creator,
      employee,
      department,
      project,
      weekId,
      hours,
    });

    await this.applications.save(application);

    return this.getSafeApplication(application);
  }

  public async confirm(applicationId: number) {
    const application = await this.applications.findOne({
      where: { id: applicationId },
    });

    if (!application) throw new NotFoundException();

    application.confirmed = true;

    return this.applications.save(application);
  }

  public async checkIsProjectManager(id: string): Promise<boolean> {
    const user = await this.users.findOne({
      where: { id: id },
      relations: { role: true },
    });

    if (user.role.name === this.projectManagerRole.name) {
      return true;
    }

    return false;
  }

  private async getSafeApplication(
    application: Application,
  ): Promise<Application> {
    const creator: User = await this.userService.getSafeUser(
      application.creator.id,
    );
    const employee: User = await this.userService.getSafeUser(
      application.employee.id,
    );

    return {
      ...application,
      creator,
      employee,
    };
  }
}
