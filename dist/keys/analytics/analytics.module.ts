import { Module } from '@nestjs/common';
import { AnalyticsResolver } from './analytics.resolver';
import { GoogleAnalyticsService } from './google-analytics.service';

@Module({
  providers: [AnalyticsResolver, GoogleAnalyticsService],
})
export class AnalyticsModule {}
