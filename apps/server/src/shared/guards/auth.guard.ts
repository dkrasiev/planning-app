import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const secret = process.env['JWT_ACCESS_SECRET'];

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    try {
      jwt.verify(token, secret);

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
