import { UpdateMasseuseCommentDto } from './dto/update-masseuseComment.dto';
import { MasseuseComment } from './models/masseuseComment.model';
import { BaseResponse } from './../shared/classes/base-response';
import { CreateMasseuseCommentDto } from './dto/create-masseuseComment.dto';
import { MasseuseCommentService } from './masseuseComment.service';;
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Public } from '../shared/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('masseuse-comments')
@ApiTags('masseuse-comments')
@ApiBearerAuth('JWT-auth')
export class MasseuseCommentController {
    constructor(
        private readonly masseuseCommentService: MasseuseCommentService
    ) {}

    @Post()
	@ApiBearerAuth('JWT-auth')
    async create(@Body() dto: CreateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
        return this.masseuseCommentService.create(dto);
    }

    @Get()
	@Public()
    async findAll(): Promise<MasseuseComment[]> {
		return this.masseuseCommentService.findAll();
	}

    @Get(':id')
	@ApiBearerAuth('JWT-auth')
	async findById(@Param('id') id: string): Promise<MasseuseComment> {
		return this.masseuseCommentService.findById(id);
	}

    
	@Delete(':id')
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('id') id: string): Promise<BaseResponse<MasseuseComment>> {
		return this.masseuseCommentService.delete(id);
	}

    @Patch(':id')
	@ApiBearerAuth('JWT-auth')
	async update(@Param('id') id: string, @Body() dto: UpdateMasseuseCommentDto): Promise<BaseResponse<MasseuseComment>> {
		return this.masseuseCommentService.update(id, dto);
	}
}