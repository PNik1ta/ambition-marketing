import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IMassage } from "../../shared/interfaces/IMassage";

@Schema()
export class Massage extends Document implements IMassage {
    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    description: string;

    @Prop({required: true})
    previewImg: string;
}

export const MassageSchema = SchemaFactory.createForClass(Massage);