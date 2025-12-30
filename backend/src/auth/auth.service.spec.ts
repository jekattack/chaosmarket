import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService (unit)', () => {
  let authService: AuthService;
  let userRepo: any;
  let jwtService: any;

  beforeEach(() => {
    userRepo = {
      findOne: jest.fn(),
      create: jest.fn((input) => input),
      save: jest.fn(),
    };

    jwtService = { sign: jest.fn(() => 'signed-token') };

    // cast mocks to any for simplicity in tests
    // @ts-ignore
    authService = new AuthService(userRepo as any, jwtService as any);
  });

  it('register hashes password and returns access_token', async () => {
    const email = 'unit@example.com';
    const password = 'secret123';
    const name = 'Unit User';

    // make save return a user with id
    // @ts-ignore
    userRepo.save = jest.fn(async (u) => ({ id: 1, ...u }));

    const res = await authService.register(email, password, name);

    expect(res).toHaveProperty('access_token', 'signed-token');
    // ensure jwt was called with payload containing email and sub
    expect(jwtService.sign).toHaveBeenCalled();

    // verify saved password is hashed
    // @ts-ignore
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

    // @ts-ignore
    userRepo.findOne = jest.fn(async () => ({ id: 2, email, password: hashed, name: 'V' }));

    const result = await authService.validateUser(email, password);
    expect(result).toBeDefined();
    expect((result as any).password).toBeUndefined();
    expect((result as any).email).toBe(email);
  });

  it('login returns access_token signed with JwtService', async () => {
    const user = { id: 3, email: 'l@example.com' };
    const res = await authService.login(user as any);
    expect(res).toHaveProperty('access_token', 'signed-token');
    expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
  });
});
