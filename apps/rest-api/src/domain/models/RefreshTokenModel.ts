import { BaseModel } from './BaseModel';

export class RefreshTokenModel extends BaseModel {
  readonly uuid: string;
  readonly hashedToken: string;
  readonly userId: number;
  readonly revoked: boolean;

  constructor(props: {
    id: number;
    uuid: string;
    hashedToken: string;
    userId: number;
    revoked: boolean;
  }) {
    super({ id: props.id });
    this.uuid = props.uuid;
    this.hashedToken = props.hashedToken;
    this.userId = props.userId;
    this.revoked = props.revoked;
  }
}
