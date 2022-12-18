import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/database/entities/user.entity';

export class AdminGuard implements CanActivate {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const secret = process.env['JWT_ACCESS_SECRET'];

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    try {
      const id = jwt.verify(token, secret);

      if (typeof id !== 'string') throw new Error();

      const user = await this.users.findOne({
        where: { id },
        relations: { role: true },
      });

      if (user.role.name === 'admin') {
        return true;
      }

      return false;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
