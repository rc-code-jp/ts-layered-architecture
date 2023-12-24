import { TaskModel } from '@/domain/models/TaskModel';

export interface ITaskRepository {
  findOne(id: number, userId: number): Promise<TaskModel | null>; // FIXME: nullabelを消
  save(task: TaskModel): Promise<TaskModel>;
  delete(id: number): Promise<TaskModel>;
}
