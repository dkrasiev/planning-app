import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/database/entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradesService {
  constructor(@InjectRepository(Grade) private grades: Repository<Grade>) {}

  public async find() {
    return await this.grades.find();
  }

  public async findById(id: number) {
    const grade = await this.grades.findOne({ where: { id } });

    if (!grade) throw new NotFoundException();

    return grade;
  }

  public async findByName(name: string) {
    const gradeArray = await this.grades.find();
    const grade = gradeArray.find((grade) =>
      grade.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (!grade) throw new NotFoundException();

    return grade;
  }

  public async deleteOne(id: number) {
    const grade = await this.grades.findOne({ where: { id } });

    if (!grade) throw new NotFoundException();

    return await this.grades.delete(grade);
  }

  public async create(name: string) {
    const grade = this.grades.create({ name });

    return await this.grades.save(grade);
  }
}
