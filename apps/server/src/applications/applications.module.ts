import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from 'src/auth/services/token.service';
import { Application } from 'src/database/entities/application.entity';
import { Department } from 'src/database/entities/department.entity';
import { Project } from 'src/database/entities/project.entity';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, Application, Department, Project]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, TokenService],
})
export class ApplicationsModule {}
