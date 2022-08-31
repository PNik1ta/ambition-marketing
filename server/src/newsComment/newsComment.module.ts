import { NewsComment, NewsCommentSchema } from './models/newsComment.model';
import { NewsCommentsController } from './newsComment.controller';
import { NewsCommentsService } from './newsComment.service';
import { NewsCommentsRepository } from './repositories/newsComment.repository';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [NewsCommentsRepository, NewsCommentsService],
    controllers: [NewsCommentsController],
    imports: [MongooseModule.forFeature([
        { name: NewsComment.name, schema: NewsCommentSchema }
    ])]
})
export class NewsCommentModule {

}