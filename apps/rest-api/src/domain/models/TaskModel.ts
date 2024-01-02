import { BaseModel } from './BaseModel';

export class TaskModel extends BaseModel {
  readonly taskGroupId: number;
  readonly title: string;
  readonly done?: boolean;
  readonly description?: string;
  readonly dueDate?: string;
  readonly dueTime?: string;
  readonly sort: number;

  static readonly INITIAL_SORT_VALUE = 65535;

  constructor(props: {
    id: number;
    taskGroupId: number;
    title: string;
    done?: boolean;
    description?: string;
    dueDate?: string;
    dueTime?: string;
    sort: number;
  }) {
    super({ id: props.id });
    this.taskGroupId = props.taskGroupId;
    this.title = props.title;
    this.done = props.done;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.dueTime = props.dueTime;
    this.sort = props.sort;
  }
}
