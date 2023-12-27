import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(props: {
    id: number;
    email: string;
    password: string;
    name: string;
  }) {
    super();
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
  }
}
