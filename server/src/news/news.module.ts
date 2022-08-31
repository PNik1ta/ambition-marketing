import { News, NewsSchema } from './models/news.model';
import { NewsRepository } from './repositories/news.repository';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [NewsController],
    providers: [NewsService, NewsRepository],
    imports: [MongooseModule.forFeature([
		{ name: News.name, schema: NewsSchema }
	])]
})
export class NewsModule {

}