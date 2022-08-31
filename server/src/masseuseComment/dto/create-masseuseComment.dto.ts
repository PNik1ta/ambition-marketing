import { IsNotEmpty, IsString } from "class-validator";

export class CreateMasseuseCommentDto {
    @IsString()
    @IsNotEmpty()
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    masseuse: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}