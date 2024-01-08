import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { generateTokens } from '@/utils/auth/jtw';
import { hashPassword } from '@/utils/auth/password';
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

    const hashedPassword = await hashPassword(params.password);

    const user = await this.repository.create({
      name: params.name,
      email: params.email,
      hashedPassword: hashedPassword,
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
