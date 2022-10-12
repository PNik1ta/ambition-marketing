import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class UpdateMasseuseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse prices',
		example: ['']
	})
    prices: string;

    @IsString()
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
		description: 'Masseuse photos',
		example: ['']
	})
    photos: string[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse name',
		example: 'test'
	})
    name: string;
}