import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateAccountDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	avatarImg: string;

	@IsNotEmpty()
	@IsString()
	about: string;

    @IsNotEmpty()
	@IsNumber()
	age: number;
}