import { INewsComments } from '../../shared/interfaces/INewsComments';
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class NewsComment extends Document implements INewsComments {
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