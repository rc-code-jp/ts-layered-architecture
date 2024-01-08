import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel {
  readonly email: string;
  readonly hashedPassword: string;
  readonly name: string;

  constructor(props: {
    id: number;
    email: string;
    hashedPassword: string;
    name: string;
  }) {
    super({ id: props.id });
    this.email = props.email;
    this.hashedPassword = props.hashedPassword;
    this.name = props.name;
  }
}
