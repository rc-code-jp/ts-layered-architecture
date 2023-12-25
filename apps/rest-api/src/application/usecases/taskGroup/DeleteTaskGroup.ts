import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export class DeleteTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  execute(params: { userId: number; taskGroupId: number }) {
    return this.repository.delete({
      userId: params.userId,
      taskGroupId: params.taskGroupId,
    });
  }
}
