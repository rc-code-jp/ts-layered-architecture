import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class GetTask {
  constructor(private repository: ITaskRepository) {}

  execute(params: { id: number; userId: number }) {
    return this.repository.findOne({
      id: params.id,
      userId: params.userId,
    });
  }
}
