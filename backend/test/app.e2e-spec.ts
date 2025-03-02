// submissions.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import pactum from 'pactum';

describe('SubmissionsController (e2e) - using Pactum', () => {
  let app: INestApplication;
  const port = 4000; // You can change this if needed

  beforeAll(async () => {
    // Create a testing module that imports the AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Create the NestJS application instance
    app = moduleFixture.createNestApplication();
    await app.init();

    // Make sure the app listens on the designated port
    await app.listen(port);
    // Set the base URL for Pactum requests
    pactum.request.setBaseUrl(`http://localhost:${port}`);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /submissions should create a submission and return the correct budget', async () => {
    const payload = {
      hourlyRate: 30,
      hours: 3,
      answers: { 'UI Level': ['Polished'], 'App size': ['Medium'] },
    };

    await pactum
      .spec()
      .post('/submissions')
      .withJson(payload)
      .expectStatus(201)
      .expectJsonLike({
        budget: 90,
      });
  });
});
