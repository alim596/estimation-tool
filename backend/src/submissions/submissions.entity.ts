// src/submissions/submissions.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hourlyRate: number;

  @Column({ default: 0 })
  designerHours: number;

  @Column({ default: 0 })
  developerHours: number;

  @Column({ default: 0 })
  totalHours: number;

  @Column({ default: 0 })
  budget: number;

  @Column('json')
  answers: Record<string, string[]>;

  @CreateDateColumn()
  createdAt: Date;
}
