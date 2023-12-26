import { UserModel } from '@/domain/models/UserModel';

export interface IUserRepository {
  findByEmail(params: { email: string }): Promise<UserModel | null>;
  create(params: { email: string; password: string; name: string }): Promise<UserModel | null>;
}
