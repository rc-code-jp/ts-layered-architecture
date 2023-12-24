import { ITaskRepository } from '@/application/repositories/ITaskRepository';

export class GetTask {
  constructor(private repository: ITaskRepository) {}

  execute(id: number, userId: number) {
    return this.repository.findOne(id, userId);
  }
}
