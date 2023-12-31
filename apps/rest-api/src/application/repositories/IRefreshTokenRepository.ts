import { RefreshTokenModel } from '@/domain/models/RefreshTokenModel';

export interface IRefreshTokenRepository {
  create(params: {
    uuid: string;
    hashedToken: string;
    userId: number;
  }): Promise<RefreshTokenModel>;

  findByUuid(params: {
    uuid: string;
  }): Promise<RefreshTokenModel | null>;

  delete(params: {
    uuid: string;
  }): Promise<RefreshTokenModel | null>;

  revokeMany(params: {
    userId: number;
  }): Promise<number>;
}
