"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../app.module");
describe('Bets (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('full flow: register -> login -> create market -> place bet -> user bets', async () => {
        const email = `e2e_${Date.now()}@example.com`;
        const password = 'password123';
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password, name: 'E2E User' })
            .expect(201);
        const login = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password })
            .expect(201);
        const token = login.body.access_token;
        expect(token).toBeDefined();
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
        await request(app.getHttpServer())
            .post('/bets')
            .set('Authorization', `Bearer ${token}`)
            .send({ marketId: market.id, outcomeId: 1, amount: 5.0 })
            .expect(201);
        const betsRes = await request(app.getHttpServer())
            .get('/bets/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(Array.isArray(betsRes.body)).toBeTruthy();
        expect(betsRes.body.length).toBeGreaterThan(0);
    }, 20000);
});
//# sourceMappingURL=bets.e2e-spec.js.map