import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Department } from 'src/database/entities/department.entity';
import { Grade } from 'src/database/entities/grade.entity';
import { Role } from 'src/database/entities/role.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { ApiTags } from '@nestjs/swagger';

export interface UpdateDto {
  firstName: string;
  lastName: string;
  department: Department;
  email: string;
  grade: Grade;
  role: Role;
  skills: Skill[];
}

@ApiTags('users')
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

  @Post(':username')
  async update(
    @Param('username') username: string,
    @Body()
    payload: UpdateDto,
  ) {
    return await this.userService.update(username, payload);
  }

  @Delete(':username')
  async deleteById(@Param('username') username: string) {
    return await this.userService.deleteByUsername(username);
  }
}
