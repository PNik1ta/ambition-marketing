import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNewsCommentDto {
    @IsString()
    @IsNotEmpty()
    comment: string;
}