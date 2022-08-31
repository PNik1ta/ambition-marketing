import { Account } from 'src/account/models/account.model';
import { BaseResponse } from './../shared/classes/base-response';
import { RateDto } from './dto/rate.dto';
import { RatingService } from './rating.service';
import { Body, Controller, Post } from "@nestjs/common";

@Controller('rate')
export class RatingController {
    constructor(
        private ratingService: RatingService
    ) {}

    @Post()
    async rate(@Body() dto: RateDto): Promise<BaseResponse<Account>> {
        return this.ratingService.rate(dto);
    }
}