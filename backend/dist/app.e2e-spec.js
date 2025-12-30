"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("./app.module");
describe('App (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/GET markets -> 200 + array', async () => {
        const res = await request(app.getHttpServer()).get('/markets').expect(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
//# sourceMappingURL=app.e2e-spec.js.map