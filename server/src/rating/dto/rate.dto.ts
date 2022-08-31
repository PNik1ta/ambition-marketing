import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class RateDto {
    @IsString()
    @IsNotEmpty()
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    toUser: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;
}