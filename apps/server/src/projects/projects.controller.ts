import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProjectsService } from './projects.service';

export interface CreateProjectPayload {
  shortTitle: string;
  fullTitle: string;
}

@ApiTags('projects')
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAll() {
    return await this.projectsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateProjectPayload) {
    return await this.projectsService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.delete(id);
  }
}
