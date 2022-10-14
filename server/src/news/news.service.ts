import { NewsEntity } from './entities/news.entity';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NEWS_CREATE_ERROR, NEWS_FIND_ERROR, NEWS_UPDATE_ERROR } from './../shared/errors/news-errors';
import { NEWS_CREATE, NEWS_DELETED, NEWS_UPDATED } from './../shared/messages/news-massages';
import { News } from './models/news.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsRepository } from './repositories/news.repository';
import { Injectable } from "@nestjs/common";
import { UpdateLikesDto } from './dto/update-likes.dto';

@Injectable()
export class NewsService {
    constructor(
        private newsRepository: NewsRepository
    ) {}

    async create(dto: CreateNewsDto): Promise<BaseResponse<News>> {
        const entity: NewsEntity = new NewsEntity({
            likesCount: 0,
            ...dto
        });

        const createdNews = await this.newsRepository.create(entity);
        createdNews.likesCount = 0;

        if (!createdNews) {
            throw new Error(NEWS_CREATE_ERROR);
        }

        return new BaseResponse<News>(NEWS_CREATE, createdNews);
    }

    async findAll(): Promise<News[]> {
        const news = await this.newsRepository.findAll();

        if (!news) {
            throw new Error(NEWS_FIND_ERROR);
        }

        return news;
    }

    async findById(id: string): Promise<News> {
        const news = await this.newsRepository.findById(id);

        if (!news) {
            throw new Error(NEWS_FIND_ERROR);
        }

        return news;
    }

    async delete(id: string): Promise<BaseResponse<News>> {
        await this.newsRepository.delete(id);
        return new BaseResponse<News>(NEWS_DELETED);
    }

    async update(id: string, dto: UpdateNewsDto): Promise<BaseResponse<News>> {
        const news = await this.newsRepository.findById(id);

        if(!news) {
            throw new Error(NEWS_FIND_ERROR);
        }

        const newsEntity = new NewsEntity(news);
        newsEntity.description = dto.description;

        if(dto.previewImg) {
            newsEntity.previewImg = dto.previewImg;
        }
        newsEntity.title = dto.title;

        const updatedNews = await this.newsRepository.update(newsEntity);

        if(!updatedNews) {
            throw new Error(NEWS_UPDATE_ERROR);
        }
        
        return new BaseResponse<News>(NEWS_UPDATED);
    }

    async changeLike(id: string, dto: UpdateLikesDto): Promise<BaseResponse<News>> {
        const updatedNews = await this.newsRepository.changeLike(id, dto);

        if(!updatedNews) {
            throw new Error(NEWS_UPDATE_ERROR);
        }
        
        return new BaseResponse<News>(NEWS_UPDATED);
    }
}