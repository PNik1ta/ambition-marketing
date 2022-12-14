import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAccount } from './../../shared/interfaces/IAccount';
import mongoose, { Document, Mongoose } from 'mongoose';
import { Role } from '../../shared/enums/Role';

@Schema()
export class Account extends Document implements IAccount {
    @Prop({required: true, unique: true})
    username: string;

    @Prop()
    fullname: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    passwordHash: string;

    @Prop()
    age: number;

    @Prop()
    avatarImg?: string;

    @Prop()
    about: string;

    @Prop({ default: new Date()})
    creationDate: Date;

    @Prop()
    rating: number;

    @Prop({ default: 0})
    ratesCount: number;

    @Prop({type: String, enum: Role, default: Role.USER})
    role: Role;

    @Prop()
    rt?: string;

    @Prop()
    ratedUsersId?: string[];

    @Prop({required: false, default: null, type: mongoose.Schema.Types.ObjectId, ref: 'Masseuse' })
    masseuseId?: string;

    @Prop({ required: false })
    likedNews?: string[];

    @Prop({ required: false })
    likedMasseuses?: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);