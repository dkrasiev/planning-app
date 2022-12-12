import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Skill } from './skill.entity';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  shortTitle: string;

  @Column({ unique: true })
  fullTitle: string;

  @ManyToOne(() => User)
  @JoinColumn()
  manager: User;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
