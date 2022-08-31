import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsCommentDto {
    @IsString()
    @IsNotEmpty()
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    newsId: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}