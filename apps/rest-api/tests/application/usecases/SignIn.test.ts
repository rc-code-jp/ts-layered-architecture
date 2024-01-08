import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { SignIn } from '@/application/usecases/auth/SignIn';
import * as bcrypt from 'bcrypt';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('usecase', () => {
  let userRepositoryMock: IUserRepository;
  let refreshTokenRepositoryMock: IRefreshTokenRepository;

  beforeEach(() => {
    const hashedPassword = bcrypt.hashSync('password', 12);
    userRepositoryMock = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockReturnValue(
        Promise.resolve({
          id: 1,
          name: 'test',
          email: 'test@example.com',
          hashedPassword: hashedPassword,
        }),
      ),
      create: vi.fn(),
    };

    refreshTokenRepositoryMock = {
      create: vi.fn(),
      findByUuid: vi.fn(),
      delete: vi.fn(),
      revokeMany: vi.fn(),
    };
  });

  // mock clear
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('SignIn', () => {
    it('should return access token and refresh token', async () => {
      console.dir(process.env);
      const signIn = new SignIn(userRepositoryMock, refreshTokenRepositoryMock);
      const result = await signIn.execute({
        email: 'example@examp.com',
        password: 'password',
      });

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
