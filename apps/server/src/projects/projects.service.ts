import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectPayload } from './projects.controller';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projects: Repository<Project>,
  ) {}

  public async create({ fullTitle, shortTitle }: CreateProjectPayload) {
    const project = this.projects.create({ fullTitle, shortTitle });

    return await this.projects.save(project);
  }

  public async getAll() {
    return await this.projects.find();
  }

  public async getById(id: number) {
    const project = await this.projects.findOne({ where: { id } });

    if (!project) throw new NotFoundException();

    return project;
  }

  public async delete(id: number) {
    const project = await this.projects.findOne({ where: { id } });

    if (!project) throw new NotFoundException();

    const result = await this.projects.delete(project.id);

    return { result: result.affected > 0 };
  }
}
