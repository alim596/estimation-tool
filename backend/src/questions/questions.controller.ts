import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('all')
  findAll() {
    return this.questionsService.getAllQuestions();
  }
}
