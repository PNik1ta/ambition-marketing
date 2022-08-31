import { IMasseuse } from './../../shared/interfaces/IMasseuse';
import mongoose, { Document} from "mongoose";
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Masseuse extends Document implements IMasseuse {
    @Prop()
    prices: string;

    @Prop()
    photos: string[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    userId: string;

    @Prop({ default: 0})
    commentsCount: number;
}

export const MasseuseSchema = SchemaFactory.createForClass(Masseuse);