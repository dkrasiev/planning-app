import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { TokenService } from 'src/auth/services/token.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApplicationsService } from './applications.service';

export interface ApplicationDto {
  week: number;
  hours: number;
  employeeUsername: string;
  projectId: number;
  description: string;
}

@ApiTags('applications')
@Controller('applications')
@UseGuards(AuthGuard)
export class ApplicationsController {
  constructor(
    private applicationsService: ApplicationsService,
    private tokenService: TokenService,
  ) {}

  @Get()
  async getAll() {
    return await this.applicationsService.getAll();
  }

  @Post()
  async create(@Body() body: ApplicationDto, @Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    const id = this.tokenService.validateAccessToken(token);

    return await this.applicationsService.create(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationsService.delete(id);
  }

  @Post(':id/toggle')
  async toggle(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationsService.toggle(id);
  }

  @Post(':id/confirm')
  async confirm(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationsService.updateStatus(id, true);
  }

  @Post(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return await this.applicationsService.updateStatus(id, false);
  }
}
