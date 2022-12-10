import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Right } from 'src/database/entities/right.entity';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './mydb.db',
      entities: [User, Role, Right],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
