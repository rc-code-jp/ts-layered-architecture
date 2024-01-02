export class BaseModel {
  readonly id: number;

  constructor(props: { id: number }) {
    this.id = props.id;
  }
}
