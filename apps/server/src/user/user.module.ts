import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Right } from './entities/right.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Right])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
