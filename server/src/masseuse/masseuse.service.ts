import { MASSEUSE_CREATE, MASSEUSE_DELETED, MASSEUSE_UPDATED } from './../shared/messages/masseuse-messagees';
import { MASSEUSE_CREATE_ERROR, MASSEUSE_FIND_ERROR, MASSEUSE_UPDATE_ERROR } from './../shared/errors/masseuse-errors';
import { MasseuseEntity } from './entities/masseuse.entity';
import { Masseuse } from './models/masseuse.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMasseuseDto } from './dto/create-masseuse.dto';
import { MasseuseRepository } from './repositories/masseuse.repository';
import { Injectable } from "@nestjs/common";
import { UpdateMasseuseDto } from './dto/update-masseuse.dto';

@Injectable()
export class MasseuseService {
    constructor(
        private masseuseRepository: MasseuseRepository
    ) {}

    async create(dto: CreateMasseuseDto): Promise<BaseResponse<Masseuse>> {
        const masseuse = await new MasseuseEntity({
            photos: dto.photos,
            prices: dto.prices,
            commentsCount: 0,
            name: dto.name,
            likesCount: 0,
            dislikesCount: 0
        });

        const createdMasseuse = await this.masseuseRepository.create(masseuse);

        if(!createdMasseuse) {
            throw new Error(MASSEUSE_CREATE_ERROR);
        }

        return new BaseResponse<Masseuse>(MASSEUSE_CREATE, createdMasseuse);
    }

    async findAll(): Promise<Masseuse[]> {
        const masseuses = await this.masseuseRepository.findAll();
        if(!masseuses) {
            throw new Error(MASSEUSE_FIND_ERROR);
        }
        return masseuses;
    }

    async findById(id: string): Promise<Masseuse> {
        const masseuse = this.masseuseRepository.findById(id);
        if(!masseuse) {
            throw new Error(MASSEUSE_FIND_ERROR);
        }
        return masseuse;
    }

    async delete(id: string): Promise<BaseResponse<Masseuse>> {
        this.masseuseRepository.delete(id);
        return new BaseResponse<Masseuse>(MASSEUSE_DELETED);
    }

    async update(id: string, dto: UpdateMasseuseDto): Promise<BaseResponse<Masseuse>> {
        const masseuse = await this.masseuseRepository.findById(id);

        const masseuseEntity = new MasseuseEntity(masseuse);
        masseuseEntity.photos = dto.photos;
        masseuseEntity.prices = dto.prices;
        masseuseEntity.name = dto.name;

        const updatedMasseuse = this.masseuseRepository.update(masseuseEntity);
        if(!updatedMasseuse) {
            throw new Error(MASSEUSE_UPDATE_ERROR);
        }
        return new BaseResponse<Masseuse>(MASSEUSE_UPDATED);
    }
}