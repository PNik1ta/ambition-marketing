import { NewsCommentModule } from './newsComment/newsComment.module';
import { NewsModule } from './news/news.module';
import { MassageModule } from './massage/massage.module';
import { MasseuseCommentModule } from './masseuseComment/masseuseComment.module';
import { MasseuseModule } from './masseuse/masseuse.module';
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
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    SharedModule,
    AccountModule,
    AuthModule, 
    RatingModule,
    MasseuseModule,
    MasseuseCommentModule,
    MassageModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    NewsModule,
    NewsCommentModule,
    FilesModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),

  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
