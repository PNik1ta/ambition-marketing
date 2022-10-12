import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateMasseuseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'Masseuse prices',
		example: ['1500']
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