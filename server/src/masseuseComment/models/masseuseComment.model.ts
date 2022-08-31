import { IMasseuseComment } from '../../shared/interfaces/IMasseuseComment';
import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MasseuseComment extends Document implements IMasseuseComment {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    fromUser: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Masseuse'})
    masseuse: string;

    @Prop({required: true})
    comment: string;
}

export const MasseuseCommentSchema = SchemaFactory.createForClass(MasseuseComment);