import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { generateTokens } from '@/utils/auth/jtw';
import { comparePassword } from '@/utils/auth/password';
import { generateUUID } from '@/utils/auth/uuid';

export class GetUser {
  constructor(
    private repository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(params: { email: string; password: string }) {
    const existsUser = await this.repository.findByEmail({ email: params.email });
    if (!existsUser) {
      throw new Error('Email not found');
    }

    const validPassword = await comparePassword(params.password, existsUser.password);
    if (!validPassword) {
      throw new Error('Password is invalid');
    }

    const uuid = await generateUUID();
    const { accessToken, refreshToken } = generateTokens(existsUser.id, uuid);

    await this.refreshTokenRepository.create({
      uuid: uuid,
      refreshToken: params.password,
      userId: existsUser.id,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
