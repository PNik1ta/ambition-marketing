import { Massage } from './models/massage.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMassageDto } from './dto/create-massage.dto';
import { MassageService } from './massage.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UpdateMassageDto } from './dto/update-massage.dto';
import { Public } from '../shared/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('massages')
@ApiTags('massages')
@ApiBearerAuth('JWT-auth')
export class MassageController {
    constructor(
        private readonly massageService: MassageService
    ) {}

    @Post()
    @HttpCode(201) 
    @ApiBearerAuth('JWT-auth')
    create(@Body() dto: CreateMassageDto): Promise<BaseResponse<Massage>> {
        return this.massageService.create(dto);
    }

    @Get()
    @HttpCode(200)
    @Public()
    findAll(): Promise<Massage[]> {
        return this.massageService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    @Public()
    findById(@Param('id') id: string): Promise<Massage> {
        return this.massageService.findById(id);
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    delete(@Param('id') id: string): Promise<BaseResponse<Massage>> {
        return this.massageService.delete(id);
    }

    @Patch(':id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    update(@Param('id') id: string, @Body() dto: UpdateMassageDto): Promise<BaseResponse<Massage>> {
        return this.massageService.update(id, dto);
    }
}