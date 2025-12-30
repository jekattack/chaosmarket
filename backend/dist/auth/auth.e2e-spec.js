"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../app.module");
describe('Auth (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('POST /auth/register and /auth/login -> returns access_token', async () => {
        const email = `e2e_${Date.now()}@example.com`;
        const password = 'password123';
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password, name: 'E2E User' })
            .expect(201);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password })
            .expect(201);
        expect(res.body).toHaveProperty('access_token');
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map