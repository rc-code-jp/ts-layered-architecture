import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { generateTokens } from '@/utils/auth/jtw';
import { generateUUID } from '@/utils/auth/uuid';

export class CreateUser {
  constructor(
    private repository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(params: { email: string; password: string; name: string }) {
    const existsUser = await this.repository.findByEmail({ email: params.email });

    if (existsUser) {
      throw new Error('Email already exists');
    }

    const user = await this.repository.create({
      email: params.email,
      password: params.password,
      name: params.name,
    });

    const uuid = await generateUUID();
    const { accessToken, refreshToken } = generateTokens(user.id, uuid);

    await this.refreshTokenRepository.create({
      uuid: uuid,
      refreshToken: params.password,
      userId: user.id,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
