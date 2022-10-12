import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News from user id comment',
		example: ''
	})
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News id',
		example: ''
	})
    newsId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News comment text',
		example: 'test'
	})
    comment: string;
}