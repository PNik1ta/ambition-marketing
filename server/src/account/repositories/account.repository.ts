import { AccountEntity } from './../entities/account.entity';
import { Account } from './../models/account.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { UpdateLikedNewsDto } from '../dto/update-liked-news.dto';
import { UpdateLikedMasseuseDto } from '../dto/update-liked-masseuse.dto';
import * as fs from 'fs';
import { path } from 'app-root-path';
import { UpdateAvatarDto } from '../dto/update-avatar.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';

@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<Account>
    ) { }

    async create(account: AccountEntity): Promise<Account> {
		if(account.masseuseId === '') {
			account.masseuseId = null;
		}
        const newAccount = new this.accountModel(account);
        return newAccount.save();
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().populate('masseuseId').exec();
    }

    async findByEmail(email: string): Promise<Account> {
		return this.accountModel.findOne({ email }).populate('masseuseId').exec();
	}

	async findById(id: string): Promise<Account> {
		return this.accountModel.findById(id).populate('masseuseId').exec();
	}

	async delete(email: string): Promise<void> {
		const account = await this.findByEmail(email);
        if(account.avatarImg && account.avatarImg !== '') {
            fs.rmSync(`${path}/uploads/${account.avatarImg}`);
        }
	 	this.accountModel.deleteOne({ email }).exec();
	}

	async update({ _id, ...rest }: AccountEntity) {
		return this.accountModel.updateOne({ _id }, { $set: { ...rest } }).exec();
	}

	async updateRefreshToken(accountId: string, rt: Pick<Account, 'rt'>): Promise<void> {
		await this.accountModel.findByIdAndUpdate(accountId, rt);
	}

	async updateLikedNews(email: string, dto: UpdateLikedNewsDto) {
		return this.accountModel.updateOne({ email }, { $push: { likedNews: dto.newsId }});
	}

	async updateLikedMasseuses(email: string, dto: UpdateLikedMasseuseDto) {
		return this.accountModel.updateOne({ email }, { $push: { likedMasseuses: dto.masseuseId }});
	}

	async updateAvatar(email: string, dto: UpdateAvatarDto) {
		return this.accountModel.updateOne({ email }, { $set: { avatarImg: dto.avatarImg }});
	}

	async updateRating(email: string, dto: UpdateRatingDto) {
		return this.accountModel.updateOne({ email }, { $inc: { rating: dto.rating, ratesCount: 1 }});
	}
}