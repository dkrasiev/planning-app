import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { hash, compare } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async getAll(): Promise<User[]> {
    return this.users.find();
  }

  async getById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  async getByUsername(username: string): Promise<User> {
    return this.users.findOne({ where: { username } });
  }

  async signup({ username, password }): Promise<User> {
    const candidate = await this.users.findOne({
      where: { username },
    });
    if (candidate)
      throw new Error(`Пользователей с ником ${username} уже существует`);

    const hashPassword = await hash(password, 3);
    const user = await this.users.save({ username, password: hashPassword });

    return user;
  }

  async login({ username, password }) {
    const user = await this.users.findOne({ where: { username } });

    return await compare(password, user.password);
  }

  async update(
    id: number,
    { password, username }: DeepPartial<User>,
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new Error('user not found');

    const hashPassword = await hash(password, 3);

    await this.users.update(user, { username, password: hashPassword });

    return this.users.findOne({ where: user });
  }

  async delete(id: number) {
    const result = await this.users.delete(id);

    return result.affected > 0;
  }
}
