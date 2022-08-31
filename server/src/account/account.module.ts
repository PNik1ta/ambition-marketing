import { AccountController } from './account.controller';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './models/account.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";

@Module({
	providers: [AccountService, AccountRepository],
	controllers: [AccountController],
	exports: [AccountService, AccountRepository],
    imports: [MongooseModule.forFeature([
		{ name: Account.name, schema: AccountSchema }
	])]
})
export class AccountModule {

}