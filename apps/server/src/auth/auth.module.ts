import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: 'DEFAULT_ROLE_NAME',
      useValue: 'default',
    },
  ],
})
export class AuthModule {}
