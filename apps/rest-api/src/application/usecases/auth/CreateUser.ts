import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { generateTokens } from '@/utils/auth/jtw';
import { hashToken } from '@/utils/auth/token';
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
    const hashedToken = await hashToken(refreshToken);

    await this.refreshTokenRepository.create({
      uuid: uuid,
      hashedToken: hashedToken,
      userId: user.id,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
