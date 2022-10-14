import { UpdateMassageDto } from './dto/update-massage.dto';
import { MASSAGE_CREATE, MASSAGE_DELETED, MASSAGE_UPDATED } from './../shared/messages/massage-messages';
import { MASSAGE_CREATE_ERROR, MASSAGE_FIND_ERROR, MASSAGE_UPDATE_ERROR } from './../shared/errors/massage-errors';
import { MassageEntity } from './entities/massage.entity';
import { Massage } from './models/massage.model';
import { BaseResponse } from './../shared/classes/base-response';
import { MassageRepository } from './repositories/massage.repository';
import { Injectable } from "@nestjs/common";
import { CreateMassageDto } from './dto/create-massage.dto';

@Injectable()
export class MassageService {
    constructor(
        private massageRepository: MassageRepository
    ) {}

    async create(dto: CreateMassageDto): Promise<BaseResponse<Massage>> {
        const massage = await new MassageEntity({
            description: dto.description,
            name: dto.name,
            previewImg: dto.previewImg
        });

        const createdMassage = await this.massageRepository.create(massage);

        if(!createdMassage) {
            throw new Error(MASSAGE_CREATE_ERROR);
        }

        return new BaseResponse<Massage>(MASSAGE_CREATE, createdMassage);
    }

    async findAll(): Promise<Massage[]> {
        const massages = await this.massageRepository.findAll();

        if(!massages) {
            throw new Error(MASSAGE_FIND_ERROR);
        }

        return massages;
    }

    async findById(id: string): Promise<Massage> {
        const massage = await this.massageRepository.findById(id);

        if(!massage) {
            throw new Error(MASSAGE_FIND_ERROR);
        }

        return massage;
    }

    async delete(id: string): Promise<BaseResponse<Massage>> {
        this.massageRepository.delete(id);
        return new BaseResponse<Massage>(MASSAGE_DELETED);
    }

    async update(id: string, dto: UpdateMassageDto): Promise<BaseResponse<Massage>> {
        const massage = await this.massageRepository.findById(id);

        if(!massage) {
            throw new Error(MASSAGE_FIND_ERROR);
        }

        const massageEntity = new MassageEntity(massage);
        massageEntity.description = dto.description;
        massageEntity.name = dto.name;

        if(dto.previewImg) {
            massageEntity.previewImg = dto.previewImg;
        }

        console.log(massageEntity);

        const updatedMassage = this.massageRepository.update(massageEntity);

        if(!updatedMassage) {
            throw new Error(MASSAGE_UPDATE_ERROR);
        }

        return new BaseResponse<Massage>(MASSAGE_UPDATED);
    }


}