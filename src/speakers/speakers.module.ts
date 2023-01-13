import { Module } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { SpeakersController } from './speakers.controller';
import { DatabaseModule } from '@/databases/database.module';
import { speakerProviders } from '@/providers/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeakersController],
  providers: [SpeakersService, ...speakerProviders]
})
export class SpeakersModule { }
