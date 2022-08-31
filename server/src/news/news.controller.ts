import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './models/news.model';
import { BaseResponse } from './../shared/classes/base-response';
import { NewsService } from './news.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateNewsDto } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
    constructor(
        private readonly newsService: NewsService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() dto: CreateNewsDto): Promise<BaseResponse<News>> {
        return this.newsService.create(dto);
    }

    @Get()
    @HttpCode(200)
    findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id') id: string): Promise<News> {
        return this.newsService.findById(id);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id: string): Promise<BaseResponse<News>> {
        return this.newsService.delete(id);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() dto: UpdateNewsDto): Promise<BaseResponse<News>> {
        return this.newsService.update(id, dto);
    }
}