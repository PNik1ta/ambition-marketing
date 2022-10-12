import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMassageDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Massage name',
		example: 'test'
	})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Massage description',
		example: 'test'
	})
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Massage preview image source',
		example: ''
	})
    previewImg: string;
}