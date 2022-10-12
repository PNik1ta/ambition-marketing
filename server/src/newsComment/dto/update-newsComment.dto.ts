import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNewsCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News comment text',
		example: 'test'
	})
    comment: string;
}