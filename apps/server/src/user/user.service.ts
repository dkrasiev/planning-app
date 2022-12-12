import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  public async getAll() {
    const users = await this.users.find();

    return users.map((user) => user.getSafeUser());
  }

  public async getById(uid: string) {
    const user = await this.users.findOne({ where: { uid } });

    return user.getSafeUser();
  }

  public async deleteById(uid: string): Promise<{ result: boolean }> {
    const result = await this.users.delete(uid);

    return { result: result.affected > 0 };
  }
}
