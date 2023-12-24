import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';

export class GetTaskGroupList {
  constructor(private repository: ITaskGroupRepository) {}

  execute(userId: number) {
    return this.repository.findAll(userId);
  }
}
