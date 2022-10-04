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
		this.accountRepository.delete(email);
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
}