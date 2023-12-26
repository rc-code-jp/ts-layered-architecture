import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { CreateUser } from '@/application/usecases/auth/CreateUser';
import { GetUser } from '@/application/usecases/auth/GetUser';
import { RefreshToken } from '@/application/usecases/auth/RefreshToken';
import { RevokeTokens } from '@/application/usecases/auth/RevokeTokens';
import { RefreshTokenRepository } from '../database/RefreshTokenRepository';
import { UserRepository } from '../database/UserRepository';

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
    const createUser = new CreateUser(this.userRepository, this.refreshTokenRepository);
    const res = await createUser.execute({
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
    const getUser = new GetUser(this.userRepository, this.refreshTokenRepository);
    const res = await getUser.execute({
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
    const refreshToken = new RefreshToken(this.userRepository, this.refreshTokenRepository);
    const res = await refreshToken.execute({
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
    const revokeTokens = new RevokeTokens(this.refreshTokenRepository);
    const res = await revokeTokens.execute({
      userId: params.userId,
    });

    return {
      count: res.count,
    };
  }
}
