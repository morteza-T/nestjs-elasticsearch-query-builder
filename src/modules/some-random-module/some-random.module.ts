import { Module } from '@nestjs/common';
import { ElasticModule } from '../elastic/elastic.module';
import { UserLogController } from './controllers/user-log.controller';
import { UserLogService } from './services/user-log.service';
import { UserLogReadResponse } from './transformers/response/user-log-read.transformer';
import { ElasticConfig } from '../../../config/elastic.config';

@Module({
  imports: [ElasticModule.registerAsync(ElasticConfig)],
  controllers: [UserLogController],
  providers: [UserLogService, UserLogReadResponse],
})
export class SomeRandomModule {}
