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
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from './dtos/department.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  async getAll() {
    return await this.departmentsService.find();
  }

  @Get('search/:query')
  async getByName(@Param('query') query: string) {
    return await this.departmentsService.findByName(query);
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
  async create(@Body() body: DepartmentDto) {
    return await this.departmentsService.create(body.name);
  }
}
