import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { TokenService } from 'src/auth/services/token.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApplicationsService } from './applications.service';

export interface CreatePayload {
  hours: number;
  weekId: number;
  employeeUid: string;
  departmentId: number;
  projectId: number;
}

@Controller('applications')
@UseGuards(AuthGuard)
export class ApplicationsController {
  constructor(
    private applicationsService: ApplicationsService,
    private tokenService: TokenService,
  ) {}

  @Get()
  async getAll() {
    try {
      return await this.applicationsService.getAll();
    } catch (e) {}
  }

  @Post()
  async create(@Body() body: CreatePayload, @Req() request: Request) {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      const uid = this.tokenService.validateAccessToken(token);

      return await this.applicationsService.create(uid, body);
    } catch (e) {}
  }

  @Post(':uid/confirm')
  async confirm(@Body() { applicationId }: { applicationId: number }) {
    try {
      this.applicationsService.confirm(applicationId);
    } catch (e) {}
  }
}
