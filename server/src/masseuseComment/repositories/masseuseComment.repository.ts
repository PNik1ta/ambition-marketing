import { MasseuseCommentEntity } from './../entities/masseuseComment.entity';
import { MasseuseComment } from './../models/masseuseComment.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class MasseuseCommentRepository {
    constructor(
        @InjectModel(MasseuseComment.name) private readonly masseuseCommentModel: Model<MasseuseComment>
    ) {}

    async create(masseuseComment: MasseuseCommentEntity): Promise<MasseuseComment> {
        const newMasseuseComment = new this.masseuseCommentModel(masseuseComment);
        return newMasseuseComment.save();
    }

    async findAll(): Promise<MasseuseComment[]> {
        return this.masseuseCommentModel.find().populate('fromUser').exec();
    }

    async findById(id: string): Promise<MasseuseComment> {
        return this.masseuseCommentModel.findById(id).populate('fromUser').exec();
    }

    async delete(id: string): Promise<void> {
        this.masseuseCommentModel.deleteOne({_id: id}).exec();
    }

    async update({ _id, ...rest }: MasseuseCommentEntity) {
        return this.masseuseCommentModel.updateOne({_id}, {$set: {...rest}}).exec();
    }
}