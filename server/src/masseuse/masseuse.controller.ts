import { UpdateMasseuseDto } from './dto/update-masseuse.dto';
import { BaseResponse } from './../shared/classes/base-response';
import { Masseuse } from './models/masseuse.model';
import { CreateMasseuseDto } from './dto/create-masseuse.dto';
import { MasseuseService } from './masseuse.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('masseuse')
export class MasseuseController {
    constructor(
        private readonly masseuseService: MasseuseService
    ) {}

    @Post()
    async create(@Body() dto: CreateMasseuseDto): Promise<BaseResponse<Masseuse>> {
        return this.masseuseService.create(dto);
    }

    @Get()
    async findAll(): Promise<Masseuse[]> {
        return this.masseuseService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Masseuse> {
        return this.masseuseService.findById(id);
    }

    @Delete(':id')
	async delete(@Param('id') id: string): Promise<BaseResponse<Masseuse>> {
		return this.masseuseService.delete(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateMasseuseDto): Promise<BaseResponse<Masseuse>> {
		return this.masseuseService.update(id, dto);
	}
}