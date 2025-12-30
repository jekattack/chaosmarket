"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const bcrypt = require("bcrypt");
describe('AuthService (unit)', () => {
    let authService;
    let userRepo;
    let jwtService;
    beforeEach(() => {
        userRepo = {
            findOne: jest.fn(),
            create: jest.fn((input) => input),
            save: jest.fn(),
        };
        jwtService = { sign: jest.fn(() => 'signed-token') };
        authService = new auth_service_1.AuthService(userRepo, jwtService);
    });
    it('register hashes password and returns access_token', async () => {
        const email = 'unit@example.com';
        const password = 'secret123';
        const name = 'Unit User';
        userRepo.save = jest.fn(async (u) => ({ id: 1, ...u }));
        const res = await authService.register(email, password, name);
        expect(res).toHaveProperty('access_token', 'signed-token');
        expect(jwtService.sign).toHaveBeenCalled();
        const savedArg = userRepo.save.mock.calls[0][0];
        expect(savedArg.email).toBe(email);
        expect(savedArg.name).toBe(name);
        expect(savedArg.password).not.toBe(password);
        const match = await bcrypt.compare(password, savedArg.password);
        expect(match).toBeTruthy();
    });
    it('validateUser returns user data without password when valid', async () => {
        const email = 'v@example.com';
        const password = 'pw12345';
        const hashed = await bcrypt.hash(password, 10);
        userRepo.findOne = jest.fn(async () => ({ id: 2, email, password: hashed, name: 'V' }));
        const result = await authService.validateUser(email, password);
        expect(result).toBeDefined();
        expect(result.password).toBeUndefined();
        expect(result.email).toBe(email);
    });
    it('login returns access_token signed with JwtService', async () => {
        const user = { id: 3, email: 'l@example.com' };
        const res = await authService.login(user);
        expect(res).toHaveProperty('access_token', 'signed-token');
        expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });
});
//# sourceMappingURL=auth.service.spec.js.map