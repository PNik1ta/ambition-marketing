import { Massage } from './models/massage.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMassageDto } from './dto/create-massage.dto';
import { MassageService } from './massage.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { UpdateMassageDto } from './dto/update-massage.dto';

@Controller('massages')
export class MassageController {
    constructor(
        private readonly massageService: MassageService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() dto: CreateMassageDto): Promise<BaseResponse<Massage>> {
        return this.massageService.create(dto);
    }

    @Get()
    @HttpCode(200)
    findAll(): Promise<Massage[]> {
        return this.massageService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id') id: string): Promise<Massage> {
        return this.massageService.findById(id);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id: string): Promise<BaseResponse<Massage>> {
        return this.massageService.delete(id);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() dto: UpdateMassageDto): Promise<BaseResponse<Massage>> {
        return this.massageService.update(id, dto);
    }
}