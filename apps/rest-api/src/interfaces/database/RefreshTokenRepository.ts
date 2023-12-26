import { IRefreshTokenRepository } from '@/application/repositories/IRefreshTokenRepository';
import { RefreshTokenModel } from '@/domain/models/RefreshTokenModel';
import { db } from '@/infrastructure/store/database/db';
import { hashToken } from '@/utils/auth/token';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(params: {
    uuid: string;
    refreshToken: string;
    userId: number;
  }): Promise<RefreshTokenModel> {
    const hashedToken = await hashToken(params.refreshToken);
    const item = await db.refreshToken.create({
      data: {
        uuid: params.uuid,
        hashedToken: hashedToken,
        userId: params.userId,
      },
    });
    return new RefreshTokenModel({
      uuid: item.uuid,
      hashedToken: item.hashedToken,
      userId: item.userId,
      revoked: item.revoked,
    });
  }

  async findByUuid(params: { uuid: string }): Promise<RefreshTokenModel | null> {
    const item = await db.refreshToken.findFirst({
      where: { uuid: params.uuid },
    });
    if (!item) return null;

    const model = new RefreshTokenModel({
      uuid: item.uuid,
      hashedToken: item.hashedToken,
      userId: item.userId,
      revoked: item.revoked,
    });
    return model;
  }

  async delete(params: { uuid: string }): Promise<RefreshTokenModel | null> {
    const item = await db.refreshToken.update({
      where: { uuid: params.uuid },
      data: {
        revoked: true,
      },
    });
    if (!item) return null;

    const model = new RefreshTokenModel({
      uuid: item.uuid,
      hashedToken: item.hashedToken,
      userId: item.userId,
      revoked: item.revoked,
    });
    return model;
  }

  async revokeMany(params: { userId: number }): Promise<number> {
    const res = await db.refreshToken.updateMany({
      where: { userId: params.userId },
      data: {
        revoked: true,
      },
    });
    return res.count;
  }
}
