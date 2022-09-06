import { INewsComment } from '../../shared/interfaces/INewsComment';
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class NewsComment extends Document implements INewsComment {
    @Prop({required: true})
    fromUser: string;

    @Prop({required: true})
    newsId: string;

    @Prop({required: true})
    comment: string;

    @Prop({default: 0})
    commentsCount: number;
}

export const NewsCommentSchema = SchemaFactory.createForClass(NewsComment);