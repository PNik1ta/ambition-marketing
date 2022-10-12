import { UpdateMasseuseDto } from './dto/update-masseuse.dto';
import { BaseResponse } from './../shared/classes/base-response';
import { Masseuse } from './models/masseuse.model';
import { CreateMasseuseDto } from './dto/create-masseuse.dto';
import { MasseuseService } from './masseuse.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Public } from '../shared/decorators/public.decorator';
import { UpdateLikesDto } from './dto/update-likes.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('masseuse')
@ApiTags('masseuse')
@ApiBearerAuth('JWT-auth')
export class MasseuseController {
    constructor(
        private readonly masseuseService: MasseuseService
    ) {}

    @Post()
    @ApiBearerAuth('JWT-auth')
    async create(@Body() dto: CreateMasseuseDto): Promise<BaseResponse<Masseuse>> {
        return this.masseuseService.create(dto);
    }

    @Get()
    @Public()
    async findAll(): Promise<Masseuse[]> {
        return this.masseuseService.findAll();
    }

    @Get(':id')
    @Public()
    async findById(@Param('id') id: string): Promise<Masseuse> {
        return this.masseuseService.findById(id);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
	async delete(@Param('id') id: string): Promise<BaseResponse<Masseuse>> {
		return this.masseuseService.delete(id);
	}

	@Patch(':id')
    @ApiBearerAuth('JWT-auth')
	async update(@Param('id') id: string, @Body() dto: UpdateMasseuseDto): Promise<BaseResponse<Masseuse>> {
		return this.masseuseService.update(id, dto);
	}

    @Patch('change-like/:id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    changeLike(@Param('id') id: string, @Body() dto: UpdateLikesDto): Promise<BaseResponse<Masseuse>> {
        return this.masseuseService.changeLike(id, dto);
    }
}