import { IUserRepository } from '@/application/repositories/IUserRepository';
import { UserModel } from '@/domain/models/UserModel';
import { db } from '@/infrastructure/store/database/db';
import { hashPassword } from '@/utils/auth/password';

export class UserRepository implements IUserRepository {
  async findByEmail(params: { email: string }): Promise<UserModel | null> {
    const item = await db.user.findFirst({
      where: { email: params.email },
    });
    if (!item) return null;

    const model = new UserModel({
      id: item.id,
      email: item.email,
      name: item.name,
      password: item.password,
    });
    return model;
  }

  async create(params: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserModel> {
    const hashedPassword = await hashPassword(params.password);
    const item = await db.user.create({
      data: {
        email: params.email,
        name: params.name,
        password: hashedPassword,
      },
    });
    return new UserModel({
      id: item.id,
      email: item.email,
      name: item.name,
      password: item.password,
    });
  }
}
