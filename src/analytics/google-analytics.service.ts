import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GoogleAnalyticsService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId?: string;

  constructor() {
    // Prefer explicit env path if provided
    const candidates = [
      process.env.GA_KEY_PATH,
      // Common runtime locations
      path.resolve(process.cwd(), 'keys/ga-service.json'),
      path.resolve(process.cwd(), 'backend/keys/ga-service.json'),
      path.resolve(__dirname, '../../keys/ga-service.json'),
    ].filter((p): p is string => !!p);

    const keyPath = candidates.find((p) => {
      try { return fs.existsSync(p); } catch { return false; }
    });

    if (!keyPath) {
      // No key available; disable GA gracefully
      this.analyticsDataClient = null as unknown as BetaAnalyticsDataClient;
      return;
    }

    this.analyticsDataClient = new BetaAnalyticsDataClient({ keyFilename: keyPath });
    this.propertyId = process.env.GA_PROPERTY_ID || '502608463';
  }

  async getActiveUsersLast7Days() {
    if (!this.analyticsDataClient || !this.propertyId) return 0;
    try {
      const [response] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
      });
      return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
    } catch {
      return 0;
    }
  }

  async getSessionsLast7Days() {
    if (!this.analyticsDataClient || !this.propertyId) return 0;
    try {
      const [response] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'sessions' }],
      });
      return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
    } catch {
      return 0;
    }
  }

  async getBounceRateLast7Days() {
    if (!this.analyticsDataClient || !this.propertyId) return 0;
    try {
      const [response] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'bounceRate' }],
      });
      return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
    } catch {
      return 0;
    }
  }
}
