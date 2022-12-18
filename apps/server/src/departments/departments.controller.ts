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
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  async getAll() {
    return await this.departmentsService.find();
  }

  @Get('search')
  async getByName(@Body() { name }: { name: string }) {
    return await this.departmentsService.findByName(name);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.departmentsService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.departmentsService.deleteOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() { name }: { name: string }) {
    return await this.departmentsService.create(name);
  }
}
