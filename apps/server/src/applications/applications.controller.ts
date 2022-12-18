import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { TokenService } from 'src/auth/services/token.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApplicationsService } from './applications.service';

export interface CreatePayload {
  hours: number;
  weekId: number;
  employee: string;
  departmentId: number;
  projectId: number;
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
  async create(@Body() body: CreatePayload, @Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    const id = this.tokenService.validateAccessToken(token);

    return await this.applicationsService.create(id, body);
  }

  @Post(':uid/confirm')
  async confirm(@Body() { applicationId }: { applicationId: number }) {
    this.applicationsService.confirm(applicationId);
  }
}
