import { Account } from './../../account/models/account.model';

export interface IRating {
    _id?: string;
    fromUser: Account;
    toUser: Account;
    rating: number;
}