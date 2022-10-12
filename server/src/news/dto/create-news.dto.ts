import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
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
		description: 'News preview image source',
		example: ''
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