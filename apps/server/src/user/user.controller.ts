import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async find() {
    return await this.userService.getAll();
  }

  @Get(':username')
  async findOneById(@Param('username') username: string) {
    const user = await this.userService.getByUsername(username);

    return user;
  }

  @Delete(':uid')
  async deleteById(@Param('uid') uid: string) {
    return await this.userService.deleteById(uid);
  }
}
