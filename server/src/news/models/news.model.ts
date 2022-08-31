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
}

export const NewsSchema = SchemaFactory.createForClass(News);