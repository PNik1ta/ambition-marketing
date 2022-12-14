import { ACCOUNT_CREATE, ACCOUNT_DELETED, ACCOUNT_UPDATED } from './../shared/messages/account-messages';
import { BaseResponse } from './../shared/classes/base-response';
import { Role } from '../shared/enums/Role';
import { ACCOUNT_CREATE_ERROR, ACCOUNT_FIND_ERROR, ACCOUNT_UPDATE_ERROR } from './../shared/errors/account-errors';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './models/account.model';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateLikedNewsDto } from './dto/update-liked-news.dto';
import { UpdateLikedMasseuseDto } from './dto/update-liked-masseuse.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Injectable()
export class AccountService {
    constructor(
		private accountRepository: AccountRepository
	) { }

    async createAccount(dto: CreateAccountDto): Promise<BaseResponse<Account>> {
		const account = await new AccountEntity({
			email: dto.email,
			username: dto.username,
			about: 'No information about user...',
			passwordHash: '',
            age: 18,
            fullname: '',
            rating: 0,
            role: dto.role ?? Role.USER,
			ratesCount: 0,
			masseuseId: dto.masseuseId
		}).setPassword(dto.password);

		const createdAccount = await this.accountRepository.create(account);

		if (!createdAccount) {
			throw new Error(ACCOUNT_CREATE_ERROR);
		}

		return new BaseResponse<Account>(ACCOUNT_CREATE, createdAccount);
	}

	async findAll(): Promise<Account[]> {
		const accounts = await this.accountRepository.findAll();
		if (!accounts) {
			throw new Error(ACCOUNT_FIND_ERROR);
		}
		return accounts;
	}

	async findAccountByEmail(email: string): Promise<Account> {
		const account = await this.accountRepository.findByEmail(email);

		if (!account) {
			throw new Error(ACCOUNT_FIND_ERROR);
		}

		return account;
	}

	async findAccountById(id: string): Promise<Account> {
		const account = await this.accountRepository.findById(id);
		if (!account) {
			throw new Error(ACCOUNT_FIND_ERROR);
		}
		return account;
	}

	async deleteAccount(email: string): Promise<BaseResponse<Account>> {
		const deletedAccount = this.accountRepository.delete(email);
		return new BaseResponse<Account>(ACCOUNT_DELETED);
	}

	async updateAccount(id: string, dto: UpdateAccountDto): Promise<BaseResponse<Account>> {
		const account = await this.accountRepository.findById(id);

		const accountEntity = new AccountEntity(account);
		accountEntity.username = dto.username;
		accountEntity.about = dto.about;
		accountEntity.avatarImg = dto.avatarImg;
		accountEntity.age = dto.age;

		const updatedAccount = this.accountRepository.update(accountEntity);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}

	async updateLikedNews(email: string, dto: UpdateLikedNewsDto): Promise<BaseResponse<Account>> {
		const updatedAccount = await this.accountRepository.updateLikedNews(email, dto);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}

	async updateLikedMasseuses(email: string, dto: UpdateLikedMasseuseDto): Promise<BaseResponse<Account>> {
		const updatedAccount = await this.accountRepository.updateLikedMasseuses(email, dto);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}

	async updateAvatar(email: string, dto: UpdateAvatarDto): Promise<BaseResponse<Account>> {
		const updatedAccount = await this.accountRepository.updateAvatar(email, dto);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}

	async updateRating(email: string, dto: UpdateRatingDto): Promise<BaseResponse<Account>> {
		const updatedAccount = await this.accountRepository.updateRating(email, dto);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}

	async updateInformation(email: string, dto: UpdateInformationDto): Promise<BaseResponse<Account>> {
		const updatedAccount = await this.accountRepository.updateInformation(email, dto);
		if (!updatedAccount) {
			throw new Error(ACCOUNT_UPDATE_ERROR);
		}
		return new BaseResponse<Account>(ACCOUNT_UPDATED);
	}
}