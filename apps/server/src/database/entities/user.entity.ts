import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Department } from './department.entity';
import { Grade } from './grade.entity';

import { Role } from './role.entity';
import { Skill } from './skill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  token: string;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => Department)
  @JoinColumn()
  department: Department;

  @ManyToOne(() => Grade)
  @JoinColumn()
  grade: Grade;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  public getSafeUser() {
    const copy = { ...this };

    delete copy.password;
    delete copy.token;

    return copy;
  }
}
