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
    const item = await getTaskGroup.execute(params.id, params.userId);

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
    const getTaskGroup = new GetTaskGroup(this.taskGroupRepository);
    const taskGroup = await getTaskGroup.execute(params.id, params.userId);

    if (!taskGroup) {
      return 0;
    }

    const updateTask = new UpdateTaskGroup(this.taskGroupRepository);
    const item = await updateTask.execute({
      props: {
        ...taskGroup.props,
        name: params.name,
        sort: 0,
      },
    });

    return item.props.id;
  }

  async deleteTaskGroup(params: {
    id: number;
    userId: number;
  }) {
    const getTaskGroup = new GetTaskGroup(this.taskGroupRepository);
    const taskGroup = await getTaskGroup.execute(params.id, params.userId);

    if (!taskGroup) {
      throw new Error('Not Fount Task');
    }

    const deleteTaskGroup = new DeleteTaskGroup(this.taskGroupRepository);
    const item = await deleteTaskGroup.execute(taskGroup);

    return item.props.id;
  }
}
