import { UpdateNewsCommentDto } from './dto/update-newsComment.dto';
import { NewsComment } from './models/newsComment.model';
import { BaseResponse } from '../shared/classes/base-response';
import { CreateNewsCommentDto } from './dto/create-newsComment.dto';
import { NewsCommentsService } from './newsComment.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Public } from '../shared/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('news-comments')
@ApiTags('news-comments')
@ApiBearerAuth('JWT-auth')
export class NewsCommentsController {
    constructor(
        private readonly newsCommentService: NewsCommentsService
    ) {}

    @Post()
    @HttpCode(201)
    @ApiBearerAuth('JWT-auth')
    create(@Body() dto: CreateNewsCommentDto): Promise<BaseResponse<NewsComment>> {
        return this.newsCommentService.create(dto);
    }

    @Get()
    @HttpCode(200)
    @Public()
    findAll(): Promise<NewsComment[]> {
        return this.newsCommentService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    findByUd(@Param('id') id: string): Promise<NewsComment> {
        return this.newsCommentService.findById(id);
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    delete(@Param('id') id: string): Promise<BaseResponse<NewsComment>> {
        return this.newsCommentService.delete(id);
    }

    @Patch(':id')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    update(@Param('id') id: string, @Body() dto: UpdateNewsCommentDto): Promise<BaseResponse<NewsComment>> {
        return this.newsCommentService.update(id, dto);
    }
}