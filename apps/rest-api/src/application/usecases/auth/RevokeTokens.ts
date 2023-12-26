import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';

export class RevokeTokens {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(params: { userId: number }) {
    const res = await this.refreshTokenRepository.revokeMany({
      userId: params.userId,
    });

    return {
      count: res,
    };
  }
}
