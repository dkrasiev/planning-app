import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade } from 'src/database/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
