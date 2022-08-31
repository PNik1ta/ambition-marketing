import { UpdateNewsCommentDto } from './dto/update-newsComment.dto';
import { NEWS_DELETED } from '../shared/messages/news-massages';
import { NEWS_COMMENT_CREATE_ERROR, NEWS_COMMENT_FIND_ERROR, NEWS_COMMENT_UPDATE_ERROR } from '../shared/errors/newsComment-errors';
import { NEWS_COMMENT_CREATE, NEWS_COMMENT_UPDATED } from '../shared/messages/newsComment-messages';
import { NewsCommentEntity } from './entities/newsComment.entity';
import { NewsComment } from './models/newsComment.model';
import { BaseResponse } from '../shared/classes/base-response';
import { CreateNewsCommentDto } from './dto/create-newsComment.dto';
import { NewsCommentsRepository } from './repositories/newsComment.repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class NewsCommentsService {
    constructor(
        private readonly newsCommentRepository: NewsCommentsRepository
    ) {}

    async create(dto: CreateNewsCommentDto): Promise<BaseResponse<NewsComment>> {
        const newsComment = await new NewsCommentEntity({
            comment: dto.comment,
            fromUser: dto.fromUser,
            newsId: dto.newsId,
            commentsCount: 0
        })
        const createdNewsComment = await this.newsCommentRepository.create(newsComment);

        if(!createdNewsComment) {
            throw new Error(NEWS_COMMENT_CREATE_ERROR);
        }
        return new BaseResponse<NewsComment>(NEWS_COMMENT_CREATE, createdNewsComment)
    }

    async findAll(): Promise<NewsComment[]> {
        const newsComments = await this.newsCommentRepository.findAll();

        if(!newsComments) {
            throw new Error(NEWS_COMMENT_FIND_ERROR);
        }

        return newsComments;
    }

    async findById(id: string): Promise<NewsComment> {
        const newsComment = await this.newsCommentRepository.findById(id);

        if(!newsComment) {
            throw new Error(NEWS_COMMENT_FIND_ERROR);
        }

        return newsComment;
    }

    async delete(id: string): Promise<BaseResponse<NewsComment>> {
        await this.newsCommentRepository.delete(id);
        return new BaseResponse<NewsComment>(NEWS_DELETED);
    }

    async update(id: string, dto: UpdateNewsCommentDto): Promise<BaseResponse<NewsComment>> {
        const newsComment = await this.newsCommentRepository.findById(id);

        const newsCommentEntity = new NewsCommentEntity(newsComment);
        newsCommentEntity.comment = dto.comment;

        const updatedMasseuse = this.newsCommentRepository.update(newsCommentEntity);
        if(!updatedMasseuse) {
            throw new Error(NEWS_COMMENT_UPDATE_ERROR);
        }
        return new BaseResponse<NewsComment>(NEWS_COMMENT_UPDATED);
    }
}