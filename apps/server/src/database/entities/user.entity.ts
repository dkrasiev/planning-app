import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  token: string;

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
