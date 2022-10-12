import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginAccountDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	@ApiProperty({
		description: 'User email',
		example: 'admin@gmail.com'
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'User password',
		example: 'admin'
	})
	password: string;

}