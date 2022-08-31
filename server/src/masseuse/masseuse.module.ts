import { Masseuse, MasseuseSchema } from './models/masseuse.model';
import { MasseuseRepository } from './repositories/masseuse.repository';
import { MasseuseService } from './masseuse.service';
import { MasseuseController } from './masseuse.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [MasseuseController],
    providers: [MasseuseService, MasseuseRepository],
    imports: [MongooseModule.forFeature([
		{ name: Masseuse.name, schema: MasseuseSchema }
	])]
})
export class MasseuseModule {

}