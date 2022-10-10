import { Masseuse } from './../models/masseuse.model';
import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MasseuseEntity } from '../entities/masseuse.entity';
import { UpdateLikesDto } from '../dto/update-likes.dto';

@Injectable()
export class MasseuseRepository {
    constructor(
        @InjectModel(Masseuse.name) private readonly masseuseModel: Model<Masseuse>
    ) {}

    async create(masseuse: MasseuseEntity): Promise<Masseuse> {
        const newMasseuse = new this.masseuseModel(masseuse);
        return newMasseuse.save();
    }

    async findAll(): Promise<Masseuse[]> {
        return this.masseuseModel.find().exec();
    }

    async findById(id: string): Promise<Masseuse> {
        return this.masseuseModel.findById(id).populate('userId').exec();
    }

    async delete(id: string): Promise<void> {
        this.masseuseModel.deleteOne({_id: id}).exec();
    }

    async update({_id, ...rest}: MasseuseEntity) {
        return this.masseuseModel.updateOne({_id}, {$set: { ...rest }}).exec();
    }

    async changeLike(id: string, dto: UpdateLikesDto) {
        return await this.masseuseModel.updateOne({_id: id}, { $set: { ...dto }});
    }
}