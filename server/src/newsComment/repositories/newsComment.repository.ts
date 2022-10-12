import { NewsCommentEntity } from '../entities/newsComment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsComment } from '../models/newsComment.model';
import { Injectable } from "@nestjs/common";

@Injectable()
export class NewsCommentsRepository {
    constructor(
        @InjectModel(NewsComment.name) private readonly newsCommentModel: Model<NewsComment>
    ) {}

    async create(newsComment: NewsCommentEntity): Promise<NewsComment> {
        const newNewsComment = new this.newsCommentModel(newsComment);
        return newNewsComment.save();
    }

    async findAll(): Promise<NewsComment[]> {
        return this.newsCommentModel.find().populate('fromUser').exec();
    }

    async findById(id: string): Promise<NewsComment> {
        return this.newsCommentModel.findById(id).populate('fromUser').exec();
    }

    async delete(id: string): Promise<void> {
        this.newsCommentModel.deleteOne({_id: id}).exec();
    }

    async update({_id, ...rest}: NewsCommentEntity) {
        return this.newsCommentModel.updateOne({_id}, {$set: { ...rest}}).exec();
    }
}