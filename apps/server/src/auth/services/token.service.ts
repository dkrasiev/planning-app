import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/database/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  public async generateAndSaveToken(user: User, data: string) {
    const tokens = this.generate(data);
    await this.save(user.uid, tokens.refresh);

    return tokens;
  }

  private generate(data: string) {
    const accessSecret = process.env['JWT_ACCESS_SECRET'];
    const refreshSecret = process.env['JWT_REFRESH_SECRET'];

    const access = jwt.sign(data, accessSecret);
    const refresh = jwt.sign(data, refreshSecret);

    return { access, refresh };
  }

  private async save(uid: string, refreshToken: string): Promise<void> {
    await this.users.update(uid, { token: refreshToken });
  }
}
