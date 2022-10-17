import { BaseResponse } from './../shared/classes/base-response';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Account } from './models/account.model';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateLikedNewsDto } from './dto/update-liked-news.dto';
import { UpdateLikedMasseuseDto } from './dto/update-liked-masseuse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { Public } from '../shared/decorators/public.decorator';

@Controller('account')
@ApiTags('account')
@ApiBearerAuth('JWT-auth')
export class AccountController {
    constructor(
        private readonly accountService: AccountService
    ) {}

    @Post()
	@ApiBearerAuth('JWT-auth')
    async create(@Body() dto: CreateAccountDto): Promise<BaseResponse<Account>> {
        return this.accountService.createAccount(dto);
    }

    @Get()
	@ApiBearerAuth('JWT-auth')
	@Public()
	async findAll(): Promise<Account[]> {
		return this.accountService.findAll();
	}

	@Get('find-by-email/:email')
	@ApiBearerAuth('JWT-auth')
	@Public()
	async findByEmail(@Param('email') email: string): Promise<Account> {
		return this.accountService.findAccountByEmail(email);
	}

	@Get('/:id')
	@ApiBearerAuth('JWT-auth')
	@Public()
	async findById(@Param('id') id: string): Promise<Account> {
		return this.accountService.findAccountById(id);
	}

	@Delete('/:email')
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('email') email: string): Promise<BaseResponse<Account>> {
		return this.accountService.deleteAccount(email);
	}

	@Patch(':id')
	@ApiBearerAuth('JWT-auth')
	async update(@Param('id') id: string, @Body() dto: UpdateAccountDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateAccount(id, dto);
	}

	@Patch('update-liked-news/:email')
	@HttpCode(200)
	@ApiBearerAuth('JWT-auth')
	async updateLikedNews(@Param('email') email: string, @Body() dto: UpdateLikedNewsDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateLikedNews(email, dto);
	}

	@Patch('update-liked-masseuses/:email')
	@HttpCode(200)
	@ApiBearerAuth('JWT-auth')
	async updateLikedMasseuses(@Param('email') email: string, @Body() dto: UpdateLikedMasseuseDto): Promise<BaseResponse<Account>> {
		return this.accountService.updateLikedMasseuses(email, dto);
	}

	@Patch('update-avatar/:email')
	@HttpCode(200)
	@ApiBearerAuth('JWT-auth')
	async updateAvatar(@Param('email') email: string, @Body() dto: UpdateAvatarDto) {
		return this.accountService.updateAvatar(email, dto);
	}

	@Patch('update-rating/:email')
	@HttpCode(200)
	@ApiBearerAuth('JWT-auth')
	async updateRating(@Param('email') email: string, @Body() dto: UpdateRatingDto) {
		return this.accountService.updateRating(email, dto);
	}

	@Patch('update-information/:email')
	@HttpCode(200)
	@ApiBearerAuth('JWT-auth')
	async updateInformation(@Param('email') email: string, @Body() dto: UpdateInformationDto) {
		return this.accountService.updateInformation(email, dto);
	}
}