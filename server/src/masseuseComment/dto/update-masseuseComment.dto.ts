import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMasseuseCommentDto {
    @IsString()
    @IsNotEmpty()
    comment: string;
}