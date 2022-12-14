import { MassageEntity } from './../entities/massage.entity';
import { Massage } from './../models/massage.model';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { path } from 'app-root-path';

@Injectable()
export class MassageRepository {
    constructor(
        @InjectModel(Massage.name) private readonly massageModel: Model<Massage>
    ) { }

    async create(massage: MassageEntity): Promise<Massage> {
        const newMassage = new this.massageModel(massage);
        return newMassage.save();
    }

    async findAll(): Promise<Massage[]> {
        return this.massageModel.find().exec();
    }

    async findById(id: string): Promise<Massage> {
        return this.massageModel.findById(id).exec();
    }

    async delete(id: string): Promise<void> {
        const massage: Massage = await this.findById(id);
        if(massage.previewImg && massage.previewImg !== '') {
            fs.rmSync(`${path}/uploads/${massage.previewImg}`);
        }
        this.massageModel.deleteOne({ _id: id}).exec();
    }

    async update({_id, ...rest}: MassageEntity) {
        return this.massageModel.updateOne({ _id }, { $set: { ...rest } }).exec()
    }
}