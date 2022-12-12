import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all() {
    try {
      return await this.userService.getAll();
    } catch (e) {}
  }

  @Get(':uid')
  async byId(@Param('uid') uid: string) {
    try {
      return await this.userService.getById(uid);
    } catch (e) {}
  }

  @Delete(':uid')
  async deleteById(@Param('uid') uid: string) {
    try {
      return await this.userService.deleteById(uid);
    } catch (e) {}
  }
}
