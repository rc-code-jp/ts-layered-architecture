import { IUserRepository } from '@/application/repositories/IUserRepository';

export class GetAuthMe {
  constructor(private repository: IUserRepository) {}

  async execute(params: { userId: number }) {
    const user = await this.repository.findById({ id: params.userId });
    if (!user) {
      throw new Error('Email not found');
    }

    return {
      user,
    };
  }
}
