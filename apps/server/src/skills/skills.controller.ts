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

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SkillsService } from './skills.service';

@Controller('skills')
@UseGuards(AuthGuard)
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  async getAll() {
    return await this.skillsService.find();
  }

  @Get('search')
  async getByName(@Body() { name }: { name: string }) {
    return await this.skillsService.findByName(name);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.skillsService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.skillsService.deleteOne(id);
  }

  @Post()
  async create(@Body() { name }: { name: string }) {
    return await this.skillsService.create(name);
  }
}
