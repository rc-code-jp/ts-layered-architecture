import { ITaskGroupRepository } from '@/application/repositries/ITaskGroupRepository';

export class GetTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  execute(id: number, userId: number) {
    return this.repository.findOne(id, userId);
  }
}
