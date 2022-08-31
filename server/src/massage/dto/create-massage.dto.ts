import { IsNotEmpty, IsString } from "class-validator";

export class CreateMassageDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    previewImg: string;
}