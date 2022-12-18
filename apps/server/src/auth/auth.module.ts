import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
