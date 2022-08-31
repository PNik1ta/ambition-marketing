import { AccountEntity } from './../entities/account.entity';
import { Account } from './../models/account.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<Account>
    ) { }

    async create(account: AccountEntity): Promise<Account> {
        const newAccount = new this.accountModel(account);
        return newAccount.save();
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findByEmail(email: string): Promise<Account> {
		return this.accountModel.findOne({ email }).exec();
	}

	async findById(id: string): Promise<Account> {
		return this.accountModel.findById(id).exec();
	}

	async delete(email: string): Promise<void> {
	 	this.accountModel.deleteOne({ email }).exec();
	}

	async update({ _id, ...rest }: AccountEntity) {
		return this.accountModel.updateOne({ _id }, { $set: { ...rest } }).exec();
	}

	async updateRefreshToken(accountId: string, rt: Pick<Account, 'rt'>): Promise<void> {
		await this.accountModel.findByIdAndUpdate(accountId, rt);
	}
}