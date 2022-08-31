import { Account } from '../Account/models/account.model';
import { RATING_CREATE } from './../shared/messages/rating-messages';

import { BaseResponse } from './../shared/classes/base-response';
import { AccountRepository } from './../account/repositories/account.repository';
import { RateDto } from './dto/rate.dto';
import { Injectable } from "@nestjs/common";
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class RatingService {
    constructor(
        private accountRepository: AccountRepository
    ) {}

    async rate(dto: RateDto): Promise<BaseResponse<Account>> {
        const fromAccount = await this.accountRepository.findById(dto.fromUser);
        const toAccount = await this.accountRepository.findById(dto.toUser);

        const fromAccountEntity = new AccountEntity(fromAccount);
        fromAccountEntity.addUser(dto.toUser);

        const toAccountEntity = new AccountEntity(toAccount);
        toAccountEntity.updateRating(dto.rating);

        await this.accountRepository.update(toAccountEntity);
        await this.accountRepository.update(fromAccountEntity);

        return new BaseResponse<Account>(RATING_CREATE);
    }
}