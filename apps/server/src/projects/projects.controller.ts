import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProjectsService } from './projects.service';

export interface CreateProjectPayload {
  shortTitle: string;
  fullTitle: string;
}

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAll() {
    try {
      return await this.projectsService.getAll();
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectsService.getById(id);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async create(@Body() body: CreateProjectPayload) {
    try {
      return await this.projectsService.create(body);
    } catch (e) {
      throw e;
    }
  }
}
