import { ITaskGroupRepository } from '@/application/repositories/ITaskGroupRepository';
import { CreateTaskGroup } from '@/application/usecases/taskGroup/CreateTaskGroup';
import { DeleteTaskGroup } from '@/application/usecases/taskGroup/DeleteTaskGroup';
import { GetTaskGroup } from '@/application/usecases/taskGroup/GetTaskGroup';
import { GetTaskGroupList } from '@/application/usecases/taskGroup/GetTaskGroupList';
import { UpdateTaskGroup } from '@/application/usecases/taskGroup/UpdateTaskGroup';
import { TaskGroupRepository } from '../database/TaskGroupRepository';

export class TaskGroupController {
  private taskGroupRepository: ITaskGroupRepository;

  constructor() {
    this.taskGroupRepository = new TaskGroupRepository();
  }

  async getTaskGroup(params: {
    id: number;
    userId: number;
  }) {
    const getTaskGroup = new GetTaskGroup(this.taskGroupRepository);
    const item = await getTaskGroup.execute({
      id: params.id,
      userId: params.userId,
    });

    return item;
  }

  async getTaskGroupList(params: {
    userId: number;
  }) {
    const getTaskGroupList = new GetTaskGroupList(this.taskGroupRepository);
    const list = await getTaskGroupList.execute(params.userId);

    return list;
  }

  async createTaskGroup(params: {
    userId: number;
    name: string;
  }) {
    const createTaskGroup = new CreateTaskGroup(this.taskGroupRepository);
    const item = await createTaskGroup.execute({
      props: {
        name: params.name,
        userId: params.userId,
        sort: 0,
      },
    });

    return item.props.id;
  }

  async updateTaskGroup(params: {
    id: number;
    userId: number;
    name: string;
  }) {
    const updateTask = new UpdateTaskGroup(this.taskGroupRepository);
    const item = await updateTask.execute({
      userId: params.userId,
      taskGroupId: params.id,
      name: params.name,
    });

    return item.props.id;
  }

  async deleteTaskGroup(params: {
    id: number;
    userId: number;
  }) {
    const deleteTaskGroup = new DeleteTaskGroup(this.taskGroupRepository);
    const res = await deleteTaskGroup.execute({
      taskGroupId: params.id,
      userId: params.userId,
    });

    return res;
  }
}
