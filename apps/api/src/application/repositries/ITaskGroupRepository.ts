import { TaskGroupModel } from '@/domain/models/TaskGroupModel';

export interface ITaskGroupRepository {
  findAll(userId: number): Promise<TaskGroupModel[]>;
  findOne(id: number, userId: number): Promise<TaskGroupModel | null>; // FIXME: nullabelを消す
  save(task: TaskGroupModel): Promise<TaskGroupModel>;
  delete(id: number): Promise<TaskGroupModel>;
}
