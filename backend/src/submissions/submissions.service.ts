// src/submissions/submissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submissions.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepo: Repository<Submission>,
  ) {}

  async createSubmission(
    hourlyRate: number,
    answers?: Record<string, string[]>,
  ): Promise<Submission> {
    // If answers is undefined, default to an empty object.
    const safeAnswers = answers || {};
    // Compute total answers safely.
    const totalAnswers = Object.values(safeAnswers).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
    // Each answer adds 1 hour for design and 1 hour for development.
    const designerHours = totalAnswers;
    const developerHours = totalAnswers;
    const totalHours = designerHours + developerHours;
    const budget = hourlyRate * totalHours;

    const newSubmission = this.submissionsRepo.create({
      hourlyRate,
      answers: safeAnswers,
      designerHours,
      developerHours,
      totalHours,
      budget,
    });

    return await this.submissionsRepo.save(newSubmission);
  }

  async findOne(id: number): Promise<Submission> {
    const submission = await this.submissionsRepo.findOneBy({ id });
    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }
    return submission;
  }
}
