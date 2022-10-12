import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateAccountDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account username',
		example: 'admin'
	})
	username: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account avatar image source',
		example: ''
	})
	avatarImg: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Account about information',
		example: 'test'
	})
	about: string;

    @IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		description: 'Account age',
		example: 18
	})
	age: number;
}