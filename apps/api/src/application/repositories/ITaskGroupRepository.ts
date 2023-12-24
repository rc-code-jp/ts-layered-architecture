import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export interface ITaskGroupRepository {
  findAll(userId: number): Promise<TaskGroupModel[]>;
  findOne(id: number, userId: number): Promise<TaskGroupModel | null>;
  save(task: TaskGroupModel): Promise<TaskGroupModel>;
  delete(item: TaskGroupModel): Promise<TaskGroupModel>;
}
