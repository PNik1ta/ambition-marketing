import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNewsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News title',
		example: 'test'
	})
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Massage preview image source',
		example: 'test'
	})
    previewImg: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'News description',
		example: 'test'
	})
    description: string;
}