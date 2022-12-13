import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  public async getAll() {
    const users = await this.users.find();

    return await Promise.all(users.map((user) => this.getSafeUser(user.uid)));
  }

  public async getById(uid: string) {
    return await this.getSafeUser(uid);
  }

  public async getByUsername(username: string) {
    const user = await this.users.findOne({ where: { username } });

    return await this.getSafeUser(user.uid);
  }

  public async deleteById(uid: string): Promise<{ result: boolean }> {
    const result = await this.users.delete(uid);

    return { result: result.affected > 0 };
  }

  private async getSafeUser(uid: string) {
    const userWithRelations = await this.users.findOne({
      where: { uid },
      relations: {
        department: true,
        grade: true,
        skills: true,
        role: true,
      },
    });

    return userWithRelations;
  }
}
