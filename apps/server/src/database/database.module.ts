import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Right } from 'src/database/entities/right.entity';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { Department } from './entities/department.entity';
import { Grade } from './entities/grade.entity';
import { Project } from './entities/project.entity';
import { Application } from './entities/application.entity';
import { Skill } from './entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './mydb.db',
      entities: [
        User,
        Role,
        Right,
        Project,
        Grade,
        Skill,
        Department,
        Application,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
