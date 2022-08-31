import { IsString, IsNotEmpty } from "class-validator";

export class UpdateMassageDto {
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