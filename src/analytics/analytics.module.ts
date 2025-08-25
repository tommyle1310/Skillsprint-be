import { Module } from '@nestjs/common';
import { AnalyticsResolver } from './analytics.resolver';

@Module({
  providers: [AnalyticsResolver],
})
export class AnalyticsModule {}
