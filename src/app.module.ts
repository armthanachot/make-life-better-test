import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeminarsModule } from './seminars/seminars.module';
import { SpeakersModule } from './speakers/speakers.module';

@Module({
  imports: [SeminarsModule, SpeakersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
