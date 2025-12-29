import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Bets (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('full flow: register -> login -> create market -> place bet -> user bets', async () => {
    const email = `e2e_${Date.now()}@example.com`;
    const password = 'password123';

    // register
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, name: 'E2E User' })
      .expect(201);

    // login
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    const token = login.body.access_token;
    expect(token).toBeDefined();

    // create market
    const marketRes = await request(app.getHttpServer())
      .post('/markets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        question: 'E2E: Will tests pass?',
        outcomes: [
          { name: 'Yes', odds: 1.5 },
          { name: 'No', odds: 2.5 },
        ],
      })
      .expect(201);

    const market = marketRes.body;
    expect(market).toHaveProperty('id');

    // place bet
    await request(app.getHttpServer())
      .post('/bets')
      .set('Authorization', `Bearer ${token}`)
      .send({ marketId: market.id, outcomeId: 1, amount: 5.0 })
      .expect(201);

    // get user bets
    const betsRes = await request(app.getHttpServer())
      .get('/bets/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(betsRes.body)).toBeTruthy();
    expect(betsRes.body.length).toBeGreaterThan(0);
  }, 20000);
});
