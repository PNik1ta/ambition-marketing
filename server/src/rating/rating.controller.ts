import { Account } from 'src/account/models/account.model';
import { BaseResponse } from './../shared/classes/base-response';
import { RateDto } from './dto/rate.dto';
import { RatingService } from './rating.service';
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('rate')
@ApiTags('rate')
@ApiBearerAuth('JWT-auth')
export class RatingController {
    constructor(
        private ratingService: RatingService
    ) {}

    @Post()
    @ApiBearerAuth('JWT-auth')
    async rate(@Body() dto: RateDto): Promise<BaseResponse<Account>> {
        return this.ratingService.rate(dto);
    }
}