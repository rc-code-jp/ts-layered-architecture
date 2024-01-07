import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { SignIn } from '@/application/usecases/auth/SignIn';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('usecase', () => {
  let userRepositoryMock: IUserRepository;
  let refreshTokenRepositoryMock: IRefreshTokenRepository;

  beforeEach(() => {
    userRepositoryMock = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockReturnValue(
        Promise.resolve({
          id: 1,
          name: 'test',
          email: 'test@example.com',
          sss: '',
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
      const signIn = new SignIn(userRepositoryMock, refreshTokenRepositoryMock);
      const result = await signIn.execute({
        email: 'example@examp.com',
        password: '123456',
      });

      expect(result).toEqual(null);
    });
  });
});
