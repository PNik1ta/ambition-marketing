import { NewsEntity } from './../entities/news.entity';
import { Model } from 'mongoose';
import { News } from './../models/news.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsRepository {
    constructor(
        @InjectModel(News.name) private readonly newsModel: Model<News>
    ) { }

    async create(news: NewsEntity): Promise<News> {
        const newNews = new this.newsModel(news);
        return newNews.save();
    }
    
    async findAll(): Promise<News[]> {
        return this.newsModel.find().exec();
    }

    async findById(id: string): Promise<News> {
        return this.newsModel.findById(id).exec();
    }

    async delete(id: string): Promise<void> {
        this.newsModel.deleteOne({ _id: id }).exec();
    }

    async update({_id, ...rest}: NewsEntity) {
        return await this.newsModel.updateOne({ _id }, { $set: { ...rest} }).exec();
    }
}