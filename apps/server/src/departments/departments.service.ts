import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from 'src/database/entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private departments: Repository<Department>,
  ) {}

  public async find() {
    return await this.departments.find();
  }

  public async findById(id: number) {
    const department = await this.departments.findOne({ where: { id } });

    if (!department) throw new NotFoundException();

    return department;
  }

  public async findByName(name: string) {
    const departmentArray = await this.departments.find();
    const department = departmentArray.find((department) =>
      department.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (!department) throw new NotFoundException();

    return department;
  }

  public async deleteOne(id: number) {
    const department = await this.departments.findOne({ where: { id } });

    if (!department) throw new NotFoundException();

    return await this.departments.delete(department);
  }

  public async create(name: string) {
    const department = this.departments.create({ name });

    return await this.departments.save(department);
  }
}
