import { Module } from '@nestjs/common';
import { SeminarsService } from './seminars.service';
import { SeminarsController } from './seminars.controller';
import { DatabaseModule } from '@/databases/database.module';
import { seminarProviders, seminarSpeakerProviders, speakerProviders, visitorProviders } from '@/providers/providers';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DatabaseModule,
    MulterModule.register({
      dest: './public',
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return cb(new Error('Only csv files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [SeminarsController],
  providers: [SeminarsService, ...seminarProviders, ...speakerProviders, ...visitorProviders, ...seminarSpeakerProviders]
})
export class SeminarsModule { }
