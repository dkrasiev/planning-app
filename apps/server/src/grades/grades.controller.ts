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
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private gradesService: GradesService) {}

  @Get()
  async getAll() {
    return await this.gradesService.find();
  }

  @Get('search')
  async getByName(@Body() { name }: { name: string }) {
    return await this.gradesService.findByName(name);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.gradesService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.gradesService.deleteOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() { name }: { name: string }) {
    return await this.gradesService.create(name);
  }
}
