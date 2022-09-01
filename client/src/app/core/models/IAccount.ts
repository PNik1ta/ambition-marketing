import { Role } from "../enums/Role";

export interface IAccount {
  _id?: string;
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  age: number;
  avatarImg?: string;
  about: string;
  creationDate?: Date;
  rating: number;
  ratesCount: number;
  role: Role;
  rt?: string;
  ratedUsersId?: string[];
}
