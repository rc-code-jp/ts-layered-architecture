import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export class DeleteTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  execute(params: TaskGroupModel) {
    return this.repository.delete(params);
  }
}
