import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Right {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
