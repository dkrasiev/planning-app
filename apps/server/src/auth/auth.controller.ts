import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { LoginDto } from './dtos/login.dto';

import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private cookieOptions: CookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  private refreshTokenKey = 'refreshToken';

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, refreshToken, user } = await this.authService.login(
      loginDto,
    );

    response.cookie(this.refreshTokenKey, refreshToken, this.cookieOptions);

    return { token, user };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const user = await this.authService.register(userDto);

    return { result: !!user };
  }

  @Get('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const tokenFromCookie = request.cookies.refreshToken;

      const { refreshToken, token, user } = await this.authService.refresh(
        tokenFromCookie,
      );

      response.cookie(this.refreshTokenKey, refreshToken, this.cookieOptions);

      return { token, user };
    } catch (e) {
      console.error(e);
      throw new ForbiddenException();
    }
  }
}
