import { BaseResponse } from './../shared/classes/base-response';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Account } from './models/account.model';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateLikedNewsDto } from './dto/update-liked-news.dto';
import { UpdateLikedMasseuseDto } from './dto/update-liked-masseuse.dto';

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountService: AccountService
    ) {}

    @Post()
    async create(@Body() dto: CreateAccountDto): Promise<BaseResponse<Account>> {
        return this.accountService.createAccount(dto);
    }

    @Get()
	async findAll(): Promise<Account[]> {
		return this.accountService.findAll();
	}

	@Get('find-by-email/:email')
	async findByEmail(@Param('email') email: string): Promise<Account> {
		return this.accountService.findAccountByEmail(email);
	}

	@Get('/:id')
	async findById(@Param('id') id: string): Promise<Account> {
		return this.accountService.findAccountById(id);
	}

	@Delete('/:email')
	async delete(@Param('email') email: string): Promise<BaseResponse<Account>> {
		return this.accountService.deleteAccount(email);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateAccountDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateAccount(id, dto);
	}

	@Patch('update-liked-news/:email')
	@HttpCode(200)
	async updateLikedNews(@Param('email') email: string, @Body() dto: UpdateLikedNewsDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateLikedNews(email, dto);
	}

	@Patch('update-liked-masseuses/:email')
	@HttpCode(200)
	async updateLikedMasseuses(@Param('email') email: string, @Body() dto: UpdateLikedMasseuseDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateLikedMasseuses(email, dto);
	}
}