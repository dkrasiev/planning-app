import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../database/entities/user.entity';
import { TokenService } from './token.service';
import { AuthDto } from '../dtos/user.dto';
import { Role } from 'src/database/entities/role.entity';

@Injectable()
export class AuthService {
  private defaultRole: Role;

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private roles: Repository<Role>,
    @Inject('DEFAULT_ROLE_NAME')
    private DEFAULT_ROLE_NAME: string,
    private tokenService: TokenService,
  ) {
    this.roles
      .findOne({ where: { name: DEFAULT_ROLE_NAME } })
      .then((defaultRole) => (this.defaultRole = defaultRole));
  }

  public async login(userDto: AuthDto) {
    const user = await this.verifyAndGetUser(userDto);

    const tokens = await this.tokenService.generateAndSaveTokens(user.uid);

    return { ...tokens, user: user.getSafeUser() };
  }

  public async register({
    username,
    password,
    firstName,
    lastName,
  }: AuthDto): Promise<User> {
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
    });

    if (this.defaultRole) user.role = this.defaultRole;

    return await this.users.save(user);
  }

  public async refresh(refreshToken: string) {
    const uid = this.tokenService.validateRefreshToken(refreshToken);

    if (typeof uid !== 'string') throw new ForbiddenException();

    const user = await this.users.findOne({ where: { uid } });

    if (!user) throw new NotFoundException('User not found');

    const tokens = await this.tokenService.generateAndSaveTokens(uid);

    return { ...tokens, user: user.getSafeUser() };
  }

  private async verifyAndGetUser({
    username,
    password,
  }: AuthDto): Promise<User> {
    const user = await this.users.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');

    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth === false) throw new ForbiddenException();

    return user;
  }
}
