import { BaseModel } from './BaseModel';

export class TaskGroupModel extends BaseModel {
  readonly id?: number;
  readonly userId: number;
  readonly name: string;
  readonly sort: number;

  constructor(props: {
    id?: number;
    userId: number;
    name: string;
    sort: number;
  }) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.sort = props.sort;
  }
}
