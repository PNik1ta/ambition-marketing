import { Role } from '../../shared/enums/Role';
import { compare, genSalt, hash } from 'bcryptjs';
import { IAccount } from './../../shared/interfaces/IAccount';

export class AccountEntity implements IAccount {
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
    
    constructor(account: IAccount) {
        this._id = account._id;
        this.username = account.username;
        this.fullname = account.fullname;
        this.email = account.email;
        this.passwordHash = account.passwordHash;
        this.age = account.age;
        this.avatarImg = account.avatarImg;
        this.about = account.about;
        this.creationDate = account.creationDate;
        this.rating = account.rating;
        this.role = account.role;
        this.rt = account.rt;
        this.ratesCount = account.ratesCount;
        this.ratedUsersId = account.ratedUsersId;
    }

    public async setPassword(password: string): Promise<AccountEntity> {
        const salt = await genSalt(10);
        this.passwordHash = await hash(password, salt);
        return this;
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this.passwordHash);
    } 

    public updateAccount(username: string, avatarImg: string, about: string, age: number): AccountEntity {
        this.username = username;
        this.avatarImg = avatarImg;
        this.about = about;
        this.age = age;
        return this;
    }

    public updateRating(rating: number) {
        this.rating += rating;
        this.ratesCount++;
    }

    public addUser(userId: string) {
        this.ratedUsersId.push(userId);
    }
}