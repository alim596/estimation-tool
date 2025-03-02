import { Injectable } from '@nestjs/common';
import questionsData from '../data/questions.json';

@Injectable()
export class QuestionsService {
  getAllQuestions() {
    return questionsData;
  }
}
