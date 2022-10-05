import { IAccount } from "./IAccount";

export interface IMasseuseComment {
  _id?: string;
  fromUser: IAccount;
  masseuse: string;
  comment: string;
}
