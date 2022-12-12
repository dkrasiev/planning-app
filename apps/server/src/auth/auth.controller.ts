import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

import { AuthDto } from './dtos/user.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  private cookieOptions: CookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: process.env.URL,
    httpOnly: true,
  };
  private refreshTokenKey = 'refreshToken';

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { token, refreshToken, user } = await this.authService.login(
        userDto,
      );

      response.cookie(this.refreshTokenKey, refreshToken, this.cookieOptions);

      return { token, user };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException();
    }
  }

  @Post('register')
  async register(@Body() userDto: AuthDto) {
    try {
      const user = await this.authService.register(userDto);

      return { result: !!user };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException();
    }
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
      throw new ForbiddenException();
    }
  }
}
