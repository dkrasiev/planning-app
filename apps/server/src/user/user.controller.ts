import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.userService.getById(Number(id));
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Post('login')
  async login(@Body() { username, password }) {
    try {
      const result = await this.userService.login({ username, password });

      if (result) {
        return result;
      }

      throw new Error('wrong password');
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(@Body() { username, password }) {
    try {
      return await this.userService.signup({ username, password });
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Post(':id')
  async updateUser(@Body() body, @Param('id') id: string) {
    try {
      return await this.userService.update(Number(id), body);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.delete(Number(id));
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }
}
