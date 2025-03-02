import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';
import { Submission } from './submissions/submissions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Submission],
      synchronize: true, // Don't use sync in production
    }),
    TypeOrmModule.forFeature([Submission]),
  ],
  controllers: [QuestionsController, SubmissionsController],
  providers: [QuestionsService, SubmissionsService],
})
export class AppModule {}
