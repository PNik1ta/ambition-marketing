import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMasseuseCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse from user id comment',
		example: ''
	})
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse id',
		example: ''
	})
    masseuse: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse comment text',
		example: 'test'
	})
    comment: string;
}