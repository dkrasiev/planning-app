import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthDto } from './dtos/user.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Delete()
  async delete(@Body() userDto: AuthDto) {
    return await this.authService.delete(userDto);
  }

  @Post('login')
  async login(@Body() userDto: AuthDto) {
    try {
      const data = await this.authService.login(userDto);

      const safeUser = data.user.getSafeUser();

      return { ...data, user: safeUser };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body() userDto: AuthDto) {
    try {
      const user = await this.authService.register(userDto);

      return user.getSafeUser();
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
