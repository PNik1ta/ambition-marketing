import { NewsEntity } from './../entities/news.entity';
import { Model } from 'mongoose';
import { News } from './../models/news.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { UpdateLikesDto } from '../dto/update-likes.dto';
import * as fs from 'fs';
import { path } from 'app-root-path';

@Injectable()
export class NewsRepository {
    constructor(
        @InjectModel(News.name) private readonly newsModel: Model<News>
    ) { }

    async create(news: NewsEntity): Promise<News> {
        const newNews = new this.newsModel(news);
        newNews.date = new Date();
        return newNews.save();
    }
    
    async findAll(): Promise<News[]> {
        return this.newsModel.find().exec();
    }

    async findById(id: string): Promise<News> {
        return this.newsModel.findById(id).exec();
    }

    async delete(id: string): Promise<void> {
        const news: News = await this.findById(id);
        if(news.previewImg || news.previewImg !== '') {
            fs.rmSync(`${path}/uploads/${news.previewImg}`);
        }
        this.newsModel.deleteOne({ _id: id }).exec();
    }

    async update({_id, ...rest}: NewsEntity) {
        return await this.newsModel.updateOne({ _id }, { $set: { ...rest} }).exec();
    }

    async changeLike(id: string, dto: UpdateLikesDto) {
        return await this.newsModel.updateOne({_id: id}, { $set: { ...dto }});
    }
}