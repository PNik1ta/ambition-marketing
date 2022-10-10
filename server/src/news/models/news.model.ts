import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { INews } from "../../shared/interfaces/INews";

@Schema()
export class News extends Document implements INews {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    previewImg: string;

    @Prop({required: true})
    description: string;

    @Prop({required: false})
    date?: Date;

    @Prop({required: true, default: 0})
    likesCount: number;
}

export const NewsSchema = SchemaFactory.createForClass(News);