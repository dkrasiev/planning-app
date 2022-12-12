import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/database/entities/user.entity';

@Injectable()
export class TokenService {
  private get accessSecret(): string {
    return process.env['JWT_ACCESS_SECRET'];
  }

  private get refreshSecret(): string {
    return process.env['JWT_REFRESH_SECRET'];
  }

  constructor(@InjectRepository(User) private users: Repository<User>) {}

  public async generateAndSaveTokens(uid: string) {
    const tokens = this.generate(uid);
    await this.save(uid, tokens.refreshToken);

    return tokens;
  }

  public validateAccessToken(token: string) {
    return this.validateToken(token, this.accessSecret);
  }

  public validateRefreshToken(refreshToken: string) {
    return this.validateToken(refreshToken, this.refreshSecret);
  }

  public validateAndUpdateRefreshToken(refreshToken: string) {
    const isValid = !!this.validateRefreshToken(refreshToken);

    return isValid;
  }

  private validateToken(token: string, secret: string): string {
    const uid = jwt.verify(token, secret);

    if (typeof uid !== 'string') {
      throw new Error();
    }

    return uid;
  }

  private generate(data: any) {
    const token = jwt.sign(data, this.accessSecret);
    const refreshToken = jwt.sign(data, this.refreshSecret);

    return { token, refreshToken };
  }

  private async save(uid: string, refreshToken: string): Promise<void> {
    await this.users.update(uid, { token: refreshToken });
  }
}
