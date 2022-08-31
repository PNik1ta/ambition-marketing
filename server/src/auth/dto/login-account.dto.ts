import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginAccountDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

}