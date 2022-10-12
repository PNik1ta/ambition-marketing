import { RtGuard } from './../shared/guards/rt.guard';
import { GetCurrentAccountId } from './../shared/decorators/get-current-account-id.decorator';
import { GetCurrentAccount } from './../shared/decorators/get-current-account.decorator';
import { Tokens } from './../shared/types/token.type';
import { CreateAccountDto } from './../account/dto/create-account.dto';
import { Public } from './../shared/decorators/public.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAccountDto } from "./dto/login-account.dto";
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

	@Public()
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() createAccountDto: CreateAccountDto): Promise<Tokens> {
		return this.authService.register(createAccountDto);
	}

	@Public()
	@Post('login')
	@ApiBody({ type: LoginAccountDto})
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginAccountDto: LoginAccountDto): Promise<Tokens> {
		return this.authService.login(loginAccountDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(accountId: string): Promise<void> {
		this.authService.logout(accountId);
	}

	@Public()
	@Post('refresh')
	@UseGuards(RtGuard)
	@HttpCode(HttpStatus.OK)
	async refreshTokens(@GetCurrentAccount('refreshToken') rt: string, @GetCurrentAccountId() accountId: string): Promise<Tokens> {
		return this.authService.refreshTokens(accountId, rt);
	}
}