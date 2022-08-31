import { MassageRepository } from './repositories/massage.repository';
import { Massage, MassageSchema } from './models/massage.model';
import { MassageController } from './massage.controller';
import { MassageService } from './massage.service';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [MassageService, MassageRepository],
    controllers: [MassageController],
    imports: [MongooseModule.forFeature([
		{ name: Massage.name, schema: MassageSchema }
	])]
})
export class MassageModule {

}