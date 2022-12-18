import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/database/entities/user.entity';
import { UpdateDto } from './user.controller';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  public async getAll() {
    const users = await this.users.find();

    return Promise.all(users.map((user) => this.getSafeUser(user.id)));
  }

  public async getByUsername(username: string) {
    const user = await this.users.findOne({ where: { username } });

    if (!user) throw new NotFoundException();

    return this.getSafeUser(user.id);
  }

  public async deleteByUsername(
    username: string,
  ): Promise<{ result: boolean }> {
    const user = await this.getByUsername(username);

    const result = await this.users.delete(user);

    return { result: result.affected > 0 };
  }

  public async update(
    username: string,
    { firstName, lastName, email, department, grade, role, skills }: UpdateDto,
  ): Promise<User> {
    const user = await this._getUserByUsername(username);

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      department,
      grade,
      role,
      skills,
    };

    await this.users.save(updatedUser);

    return this.getSafeUser(user.id);
  }

  public async getUserWithAllRelations(id: string) {
    return await this.users.findOne({
      where: { id },
      relations: {
        department: true,
        grade: true,
        skills: true,
        role: {
          rights: true,
        },
      },
    });
  }

  public async getSafeUser(id: string): Promise<User> {
    const user = await this.getUserWithAllRelations(id);

    if (!user) throw new NotFoundException();

    delete user.id;
    delete user.password;
    delete user.token;

    return user;
  }

  private async _getUserByUsername(username: string) {
    const user = await this.users.findOne({ where: { username } });

    if (!user) throw new NotFoundException();

    return user;
  }
}
