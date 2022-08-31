import { RatingController } from './rating.controller';
import { AccountModule } from './../account/account.module';
import { RatingService } from './rating.service';
import { Module } from "@nestjs/common";

@Module({
    controllers: [RatingController],
    providers: [RatingService],
    imports: [AccountModule]
})
export class RatingModule {

}