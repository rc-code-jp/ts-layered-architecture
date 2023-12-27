export class TaskGroupModel {
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
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.sort = props.sort;
  }
}
