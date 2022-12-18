import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from 'src/database/entities/department.entity';
import { Project } from 'src/database/entities/project.entity';
import { Application } from 'src/database/entities/application.entity';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { ApplicationDto } from './applications.controller';
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
    const applications = await this.applications.find({
      relations: { employee: true, creator: true, project: true },
    });

    for (const application of applications) {
      application.employee = await this.userService.getSafeUser(
        application.employee.id,
      );

      application.creator = await this.userService.getSafeUser(
        application.creator.id,
      );
    }

    return applications;
  }

  public async create(
    id: string,
    { week, hours, employeeUsername, projectId, description }: ApplicationDto,
  ) {
    const creator = await this.users.findOne({ where: { id } });
    const employee = await this.users.findOne({
      where: { username: employeeUsername },
    });

    const project = await this.projects.findOne({ where: { id: projectId } });

    const application = this.applications.create({
      weekId: week,
      hours,
      creator,
      employee,
      project,
      description,
      confirmed: false,
    });

    await this.applications.save(application);

    return this.getSafeApplication(application);
  }

  public async toggle(id: number) {
    const application = await this.getApplication(id);

    application.confirmed = !application.confirmed;

    return this.applications.save(application);
  }

  public async updateStatus(id: number, newStatus = true) {
    const application = await this.getApplication(id);

    application.confirmed = newStatus;

    return this.applications.save(application);
  }

  public async delete(id: number) {
    const result = await this.applications.delete(id);

    return { result: result.affected > 0 };
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

  private async getApplication(id: number) {
    const candidate = await this.applications.findOne({ where: { id } });

    if (!candidate) throw new NotFoundException('Application not found');

    return candidate;
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
