import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateMasseuseDto {
    @IsString()
    @IsNotEmpty()
    prices: string;

    @IsString()
    @IsNotEmpty()
    @IsArray()
    photos: string[];

    @IsString()
    @IsNotEmpty()
    userId: string;
}