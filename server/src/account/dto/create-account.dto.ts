import { Role } from './../../shared/enums/Role';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	@ApiProperty({
		description: 'Account email',
		example: 'admin@gmail.com'
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account password',
		example: 'admin'
	})
	password: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account username',
		example: 'admin'
	})
	username: string;

	@IsEnum(Role)
	@ApiProperty({
		description: 'Account role',
		example: Role.ADMIN
	})
	role?: Role;

	@IsString()
	@ApiProperty({
		description: 'Account masseuseId',
		example: ''
	})
	masseuseId?: string;
}