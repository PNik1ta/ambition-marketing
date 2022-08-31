import { UpdateMasseuseCommentDto } from './dto/update-masseuseComment.dto';
import { MasseuseComment } from './models/masseuseComment.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMasseuseCommentDto } from './dto/create-masseuseComment.dto';
import { MasseuseCommentService } from './masseuseComment.service';;
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('masseuse-comments')
export class MasseuseCommentController {
    constructor(
        private readonly masseuseCommentService: MasseuseCommentService
    ) {}

    @Post()
    async create(@Body() dto: CreateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
        return this.masseuseCommentService.create(dto);
    }

    @Get()
    async findAll(): Promise<MasseuseComment[]> {
		return this.masseuseCommentService.findAll();
	}

    @Get(':id')
	async findById(@Param('id') id: string): Promise<MasseuseComment> {
		return this.masseuseCommentService.findById(id);
	}

    
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<BaseResponse<MasseuseComment>> {
		return this.masseuseCommentService.delete(id);
	}

    @Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
		return this.masseuseCommentService.update(id, dto);
	}
}