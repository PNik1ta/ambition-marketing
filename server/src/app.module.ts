import { RatingModule } from './rating/rating.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards/at.guard';

@Module({
  imports: [
    SharedModule,
    AccountModule,
    AuthModule, 
    RatingModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
		MongooseModule.forRootAsync(getMongoConfig())
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
