import { UpdateMasseuseCommentDto } from './dto/update-masseuseComment.dto';
import { MASSEUSE_COMMENT_CREATE, MASSEUSE_COMMENT_DELETED, MASSEUSE_COMMENT_UPDATED } from './../shared/messages/masseuseComment-messages';
import { MASSEUSE_COMMENT_CREATE_ERROR, MASSEUSE_COMMENT_FIND_ERROR, MASSEUSE_COMMENT_UPDATE_ERROR } from './../shared/errors/masseuseComment-errors';
import { MasseuseCommentEntity } from './entities/masseuseComment.entity';
import { MasseuseComment } from './models/masseuseComment.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMasseuseCommentDto } from './dto/create-masseuseComment.dto';
import { MasseuseCommentRepository } from './repositories/masseuseComment.repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MasseuseCommentService {
    constructor(
        private readonly masseuseCommentRepository: MasseuseCommentRepository
    ) {}

    async create(dto: CreateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
        const masseuseComment = await new MasseuseCommentEntity({
            comment: dto.comment,
            fromUser: dto.fromUser,
            masseuse: dto.masseuse
        });

        const createdMasseuseComment = await this.masseuseCommentRepository.create(masseuseComment);

        if(!createdMasseuseComment) {
            throw new Error(MASSEUSE_COMMENT_CREATE_ERROR);
        };

        return new BaseResponse<MasseuseComment>(MASSEUSE_COMMENT_CREATE, createdMasseuseComment);
    }

    async findAll(): Promise<MasseuseComment[]> {
        const masseuseComments = await this.masseuseCommentRepository.findAll();
        if(!masseuseComments) {
            throw new Error(MASSEUSE_COMMENT_FIND_ERROR);
        }
        return masseuseComments;
    }

    async findById(id: string): Promise<MasseuseComment> {
        const masseuseComment = this.masseuseCommentRepository.findById(id);
        if(!masseuseComment) {
            throw new Error(MASSEUSE_COMMENT_FIND_ERROR);
        }
        return masseuseComment;
    }

    async delete(id: string): Promise<BaseResponse<MasseuseComment>> {
        this.masseuseCommentRepository.delete(id);
        return new BaseResponse<MasseuseComment>(MASSEUSE_COMMENT_DELETED);
    }

    async update(id: string, dto: UpdateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
        const masseuseComment = await this.masseuseCommentRepository.findById(id);

        const masseuseCommentEntity = new MasseuseCommentEntity(masseuseComment);
        masseuseCommentEntity.comment = dto.comment;

        const updatedMasseuse = this.masseuseCommentRepository.update(masseuseCommentEntity);
        if(!updatedMasseuse) {
            throw new Error(MASSEUSE_COMMENT_UPDATE_ERROR);
        }
        return new BaseResponse<MasseuseComment>(MASSEUSE_COMMENT_UPDATED);
    }
}