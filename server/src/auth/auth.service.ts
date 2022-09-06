import { Role } from './../shared/enums/Role';
import { AccountEntity } from './../account/entities/account.entity';
import { CreateAccountDto } from './../account/dto/create-account.dto';
import { Tokens } from './../shared/types/token.type';
import { AccountRepository } from './../account/repositories/account.repository';
import { AccountService } from './../account/account.service';
import { ACCOUNT_INCORRECT_PASSWORD_ERROR, ACCOUNT_INCORRECT_RT_ERROR } from './../shared/errors/account-errors';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginAccountDto } from "./dto/login-account.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
		private readonly accountService: AccountService,
		private readonly jwtService: JwtService,
		private accountRepository: AccountRepository
	) { }

	async getTokens(accountId: string, email: string, role: string): Promise<Tokens> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync({
				sub: accountId,
				email,
				role
			}, {
				secret: 'at-secret',
				expiresIn: 60 * 30
			}),
			this.jwtService.signAsync({
				sub: accountId,
				email,
				role
			}, {
				secret: 'rt-secret',
				expiresIn: 60 * 60 * 24 * 7,
			})
		]);

		return {
			access_token: at,
			refresh_token: rt
		}
	}

	async register(accountDto: CreateAccountDto): Promise<Tokens> {
		const newAccount = await this.accountService.createAccount(accountDto);

		const tokens = await this.getTokens(newAccount.data.id, newAccount.data.email, newAccount.data.role);
		await this.updateRtHash(newAccount.data.id, tokens.refresh_token);
		return tokens;
	}

	async login(accountDto: LoginAccountDto): Promise<Tokens> {
		const account = await this.accountService.findAccountByEmail(accountDto.email);

		let isValid: boolean = await new AccountEntity(account).validatePassword(accountDto.password);

		if (!isValid) {
			throw new ForbiddenException(ACCOUNT_INCORRECT_PASSWORD_ERROR);
		}

		const tokens = await this.getTokens(account.id, account.email, account.role);
		await this.updateRtHash(account.id, tokens.refresh_token);
		return tokens;
	}

	async logout(accountId: string): Promise<void> {
		await this.accountRepository.updateRefreshToken(accountId, { rt: null });
	}

	async refreshTokens(accountId: string, rt: string): Promise<Tokens> {
		const account = await this.accountService.findAccountById(accountId);

		const rtMatches = await bcrypt.compare(rt, account.rt);
		if (!rtMatches) {
			throw new ForbiddenException(ACCOUNT_INCORRECT_RT_ERROR);
		}

		const tokens = await this.getTokens(account.id, account.email, account.role);
		await this.updateRtHash(account.id, tokens.refresh_token);
		return tokens;
	}

	hashData(data: string): Promise<string> {
		return bcrypt.hash(data, 10);
	}

	async updateRtHash(accountId: string, rt: string): Promise<void> {
		const hash = await this.hashData(rt);
		await this.accountRepository.updateRefreshToken(accountId, { rt: hash });
	}
}