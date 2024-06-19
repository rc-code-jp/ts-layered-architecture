import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { CreateUser } from '@/application/usecases/auth/CreateUser';
import { GetAuthMe } from '@/application/usecases/auth/GetAuthMe';
import { RefreshToken } from '@/application/usecases/auth/RefreshToken';
import { RevokeTokens } from '@/application/usecases/auth/RevokeTokens';
import { SignIn } from '@/application/usecases/auth/SignIn';
import { RefreshTokenRepository } from '../../infrastructure/repository/RefreshTokenRepository';
import { UserRepository } from '../../infrastructure/repository/UserRepository';

export class AuthController {
  private userRepository: IUserRepository;
  private refreshTokenRepository: IRefreshTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async signUp(params: {
    email: string;
    password: string;
    name: string;
  }) {
    const usecase = new CreateUser(this.userRepository, this.refreshTokenRepository);
    const res = await usecase.execute({
      email: params.email,
      password: params.password,
      name: params.name,
    });

    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };
  }

  async signIn(params: {
    email: string;
    password: string;
  }) {
    const usecase = new SignIn(this.userRepository, this.refreshTokenRepository);
    const res = await usecase.execute({
      email: params.email,
      password: params.password,
    });

    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };
  }

  async refreshToken(params: {
    refreshToken: string;
  }) {
    const usecase = new RefreshToken(this.userRepository, this.refreshTokenRepository);
    const res = await usecase.execute({
      refreshToken: params.refreshToken,
    });

    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };
  }

  async revokeTokens(params: {
    userId: number;
  }) {
    const usecase = new RevokeTokens(this.refreshTokenRepository);
    const res = await usecase.execute({
      userId: params.userId,
    });

    return {
      count: res.count,
    };
  }

  async getAuthMe(params: {
    userId: number;
  }) {
    const usecase = new GetAuthMe(this.userRepository);
    const res = await usecase.execute({
      userId: params.userId,
    });

    return {
      item: res.user,
    };
  }
}
