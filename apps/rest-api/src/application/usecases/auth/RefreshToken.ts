import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { generateTokens, verifyToken } from '@/utils/auth/jtw';
import { comparePassword } from '@/utils/auth/password';
import { hashToken } from '@/utils/auth/token';
import { generateUUID } from '@/utils/auth/uuid';

export class RefreshToken {
  constructor(
    private repository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(params: { refreshToken: string }) {
    const payload = verifyToken(params.refreshToken);
    const savedRefreshToken = await this.refreshTokenRepository.findByUuid(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.props.revoked) {
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(params.refreshToken);
    if (hashedToken !== savedRefreshToken.props.hashedToken) {
      throw new Error('Unauthorized');
    }

    const user = await this.repository.findById({
      id: savedRefreshToken.props.userId,
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    await this.refreshTokenRepository.delete({
      uuid: savedRefreshToken.props.uuid,
    });

    const uuid = generateUUID();
    const { accessToken, refreshToken } = generateTokens(user.props.id, uuid);

    await this.refreshTokenRepository.create({
      uuid: uuid,
      refreshToken: refreshToken,
      userId: user.props.id,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
