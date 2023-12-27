import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export class CreateTaskGroup {
  constructor(private repository: ITaskGroupRepository) {}

  execute(params: TaskGroupModel) {
    const model = new TaskGroupModel({
      name: params.name,
      userId: params.userId,
      sort: 0,
    });
    return this.repository.save({ item: model });
  }
}
