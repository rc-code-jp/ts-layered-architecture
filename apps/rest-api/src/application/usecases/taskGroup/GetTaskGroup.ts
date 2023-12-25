import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class GetTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  execute(params: { id: number; userId: number }) {
    return this.repository.findOne({
      id: params.id,
      userId: params.userId,
    });
  }
}
