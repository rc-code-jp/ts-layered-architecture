import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class GetTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  async execute(params: { id: number; userId: number }) {
    return await this.repository.findOne({
      id: params.id,
      userId: params.userId,
    });
  }
}
