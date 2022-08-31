import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class UpdateMasseuseDto {
    @IsString()
    @IsNotEmpty()
    prices: string;

    @IsString()
    @IsNotEmpty()
    @IsArray()
    photos: string[];
}