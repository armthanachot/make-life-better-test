import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`
        })
      ],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }