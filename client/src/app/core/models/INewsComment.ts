import { IAccount } from "./IAccount";

export interface INewsComment {
  _id?: string;
  fromUser: IAccount;
  newsId: string;
  comment: string;
  commentsCount: number;
}
