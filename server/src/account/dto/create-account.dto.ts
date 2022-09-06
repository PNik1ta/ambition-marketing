import { Role } from './../../shared/enums/Role';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateAccountDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsEnum(Role)
	role?: Role;
}