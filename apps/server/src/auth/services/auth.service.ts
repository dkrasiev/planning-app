import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../database/entities/user.entity';
import { TokenService } from './token.service';
import { RegisterDto } from '../dtos/register.dto';
import { Role } from 'src/database/entities/role.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  private defaultRole: Role;

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private roles: Repository<Role>,

    private tokenService: TokenService,
    private userService: UserService,
  ) {
    const defaultRoleName = process.env.DEFAULT_ROLE_NAME;

    if (defaultRoleName) {
      this.roles
        .findOne({ where: { name: defaultRoleName } })
        .then((defaultRole) => (this.defaultRole = defaultRole));
    } else {
      this.roles
        .findOne({ where: { id: 1 } })
        .then((role) => (this.defaultRole = role));
    }
  }

  public async login(loginDto: LoginDto) {
    const user = await this.verifyAndGetUser(loginDto);

    const tokens = await this.tokenService.generateAndSaveTokens(user.id);

    const safeUser = this.userService.getSafeUser(user.id);

    return { ...tokens, user: safeUser };
  }

  public async register({
    username,
    password,
    firstName,
    lastName,
    email,
  }: RegisterDto): Promise<User> {
    const candidate = await this.users.findOne({
      where: { username },
    });
    if (candidate)
      throw new BadRequestException(
        `User with username ${username} already exists`,
      );

    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.users.create({
      username,
      password: hashPassword,
      firstName,
      lastName,
      email,
      role: this.defaultRole,
    });

    return await this.users.save(user);
  }

  public async refresh(refreshToken: string) {
    const id = this.tokenService.validateRefreshToken(refreshToken);

    if (typeof id !== 'string') throw new ForbiddenException();

    const user = await this.users.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const tokens = await this.tokenService.generateAndSaveTokens(id);

    const safeUser = this.userService.getSafeUser(user.id);

    return { ...tokens, user: safeUser };
  }

  private async verifyAndGetUser({
    username,
    password,
  }: LoginDto): Promise<User> {
    const user = await this.users.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');

    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth === false) throw new ForbiddenException();

    return user;
  }
}
