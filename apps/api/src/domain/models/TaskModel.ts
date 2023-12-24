export class TaskModel {
  constructor(
    readonly props: {
      id?: number;
      taskGroupId: number;
      title: string;
      done?: boolean;
      description?: string;
      dueDate?: string;
      dueTime?: string;
      sort: number;
    },
  ) {}
}
