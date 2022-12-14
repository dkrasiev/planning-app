import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Skill } from 'src/database/entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(@InjectRepository(Skill) private skills: Repository<Skill>) {}

  public async find() {
    return await this.skills.find();
  }

  public async findById(id: number) {
    const skill = await this.skills.findOne({ where: { id } });

    if (!skill) throw new NotFoundException();

    return skill;
  }

  public async findByName(name: string) {
    const skillArray = await this.skills.find();
    const skill = skillArray.find((skill) =>
      skill.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (!skill) throw new NotFoundException();

    return skill;
  }

  public async deleteOne(id: number) {
    const skill = await this.skills.findOne({ where: { id } });

    if (!skill) throw new NotFoundException();

    return await this.skills.delete(skill);
  }

  public async create(name: string) {
    const skill = this.skills.create({ name });

    return await this.skills.save(skill);
  }
}
