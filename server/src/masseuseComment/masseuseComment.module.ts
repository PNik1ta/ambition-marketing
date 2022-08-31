import { MasseuseComment, MasseuseCommentSchema } from './models/masseuseComment.model';
import { MasseuseCommentController } from './masseuseComment.controller';
import { MasseuseCommentService } from './masseuseComment.service';
import { MasseuseCommentRepository } from './repositories/masseuseComment.repository';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [MasseuseCommentRepository, MasseuseCommentService],
    controllers: [MasseuseCommentController],
    imports: [MongooseModule.forFeature([
		  { name: MasseuseComment.name, schema: MasseuseCommentSchema }
	  ])]
})
export class MasseuseCommentModule {

}