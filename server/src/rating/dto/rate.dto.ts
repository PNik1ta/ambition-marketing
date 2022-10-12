import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class RateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'From user id rating',
		example: ''
	})
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
		description: 'To user id rating',
		example: ''
	})
    toUser: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    @ApiProperty({
		description: 'Rating number',
		example: 5
	})
    rating: number;
}