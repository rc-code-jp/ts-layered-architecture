import { ITaskGroupRepository } from '@/application/repositries/ITaskGroupRepository';
import { ITaskRepository } from '@/application/repositries/ITaskRepository';
import { CreateTask } from '@/application/usecases/task/CreateTask';
import { GetTaskGroup } from '@/application/usecases/taskGroup/GetTaskGroup';
import { TaskGroupRepository } from '../database/TaskGroupRepository';
import { TaskRepository } from '../database/TaskRepository';

export class TaskController {
  private taskRepository: ITaskRepository;
  private taskGroupRepository: ITaskGroupRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.taskGroupRepository = new TaskGroupRepository();
  }

  async createTask(params: {
    taskGroupId: number;
    userId: number;
    title: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
  }) {
    const getTaskGroup = new GetTaskGroup(this.taskGroupRepository);
    const taskGroup = await getTaskGroup.execute(params.taskGroupId, params.userId);

    if (!taskGroup) {
      throw new Error('Not Fount Task Group');
    }

    const createTask = new CreateTask(this.taskRepository);
    const item = await createTask.execute({
      props: {
        taskGroupId: params.taskGroupId,
        title: params.title,
        description: params.description,
        dueDate: params.dueDate,
        dueTime: params.dueTime,
      },
    });

    return item.props.id;
  }
}
