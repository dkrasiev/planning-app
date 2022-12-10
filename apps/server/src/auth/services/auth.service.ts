import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../database/entities/user.entity';
import { TokenService } from './token.service';
import { AuthDto } from '../dtos/user.dto';
import { Role } from 'src/database/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private roles: Repository<Role>,
    @Inject('DEFAULT_ROLE')
    private getDefaultRole: (roles: Repository<Role>) => Promise<Role>,
    private tokenService: TokenService,
  ) {}

  public async login(userDto: AuthDto) {
    const user = await this.verifyAndGetUser(userDto);

    const tokens = await this.tokenService.generateAndSaveToken(
      user,
      user.username,
    );

    return { tokens, user };
  }

  public async register({ username, password }: AuthDto): Promise<User> {
    const candidate = await this.users.findOne({ where: { username } });
    if (candidate)
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);

    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.users.create({ username, password: hashPassword });

    const defaultRole = await this.getDefaultRole(this.roles);
    user.role = defaultRole;

    return await this.users.save(user);
  }

  public async delete(userDto: AuthDto) {
    const user = await this.verifyAndGetUser(userDto);

    const result = await this.users.delete(user.uid);

    console.log(user);
    console.log(result);

    return { result: result.affected > 0 };
  }

  private async verifyAndGetUser({
    username,
    password,
  }: AuthDto): Promise<User> {
    const user = await this.users.findOne({ where: { username } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth === false)
      throw new HttpException('Incorrect credentials', HttpStatus.FORBIDDEN);

    return user;
  }
}
