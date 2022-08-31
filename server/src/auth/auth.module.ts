import { getJwtConfig } from './../configs/jwt.config';
import { AccountModule } from './../account/account.module';
import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
    providers: [AuthService, AtStrategy, RtStrategy],
	controllers: [AuthController],
    imports: [AccountModule, JwtModule.registerAsync(getJwtConfig())]
})
export class AuthModule {

}