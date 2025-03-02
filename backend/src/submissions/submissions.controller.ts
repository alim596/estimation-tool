// submissions.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async createSubmission(
    @Body() body: { hourlyRate: number; answers: Record<string, string[]> },
  ) {
    const submission = await this.submissionsService.createSubmission(
      body.hourlyRate,
      body.answers,
    );
    // Return all relevant data
    return {
      id: submission.id,
      designerHours: submission.designerHours,
      developerHours: submission.developerHours,
      totalHours: submission.totalHours,
      budget: submission.budget,
      createdAt: submission.createdAt,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const submission = await this.submissionsService.findOne(id);
    return {
      id: submission.id,
      designerHours: submission.designerHours,
      developerHours: submission.developerHours,
      totalHours: submission.totalHours,
      budget: submission.budget,
      createdAt: submission.createdAt,
      answers: submission.answers,
    };
  }
}
