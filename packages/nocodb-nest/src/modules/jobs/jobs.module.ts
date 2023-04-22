import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { GlobalModule } from '../global/global.module';
import { DatasModule } from '../datas/datas.module';
import { MetasModule } from '../metas/metas.module';
import { JobsService } from './jobs.service';
import { ExportService } from './export-import/export.service';
import { ImportService } from './export-import/import.service';
import { DuplicateController } from './export-import/duplicate.controller';
import { DuplicateProcessor } from './export-import/duplicate.processor';
import { JobsGateway } from './jobs.gateway';
import { QueueService } from './fallback-queue.service';

@Module({
  imports: [
    GlobalModule,
    DatasModule,
    MetasModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  controllers: [DuplicateController],
  providers: [
    QueueService,
    JobsGateway,
    JobsService,
    DuplicateProcessor,
    ExportService,
    ImportService,
  ],
})
export class JobsModule {}