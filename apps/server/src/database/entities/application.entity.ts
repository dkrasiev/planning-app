import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekId: number;

  @Column()
  hours: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  confirmed: boolean;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: User;

  @ManyToOne(() => User)
  @JoinColumn()
  employee: User;
}
