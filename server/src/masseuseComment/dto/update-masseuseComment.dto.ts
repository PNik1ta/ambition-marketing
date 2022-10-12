import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMasseuseCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse comment text',
		example: 'text'
	})
    comment: string;
}