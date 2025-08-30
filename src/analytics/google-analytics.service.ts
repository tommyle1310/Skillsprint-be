import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GoogleAnalyticsService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId?: string;

  constructor() {
    const candidates = [
      process.env.GA_KEY_PATH,
      path.resolve(process.cwd(), 'keys/ga-service.json'),
      path.resolve(process.cwd(), 'backend/keys/ga-service.json'),
      path.resolve(__dirname, '../../keys/ga-service.json'),
    ].filter((p): p is string => !!p);

    const keyPath = candidates.find((p) => {
      try { return fs.existsSync(p); } catch { return false; }
    });

    if (!keyPath) {
      this.analyticsDataClient = null as unknown as BetaAnalyticsDataClient;
      return;
    }

    this.analyticsDataClient = new BetaAnalyticsDataClient({ keyFilename: keyPath });
    this.propertyId = process.env.GA_PROPERTY_ID || '502608463';
  }

  private async runReport(metrics: any[], dimensions: any[] = [], dateRange = { startDate: '7daysAgo', endDate: 'today' }) {
    if (!this.analyticsDataClient || !this.propertyId) return null;
    try {
      const [response] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [dateRange],
        metrics,
        dimensions,
      });
      return response;
    } catch (err) {
      console.error('GA Report Error:', err);
      return null;
    }
  }

  // ===== BASIC METRICS =====

  /** Active users in last 7 days */
  async getActiveUsersLast7Days() {
    const res = await this.runReport([{ name: 'activeUsers' }]);
    return Number(res?.rows?.[0]?.metricValues?.[0]?.value || 0);
  }

  /** Sessions in last 7 days */
  async getSessionsLast7Days() {
    const res = await this.runReport([{ name: 'sessions' }]);
    return Number(res?.rows?.[0]?.metricValues?.[0]?.value || 0);
  }

  /** Bounce Rate */
  async getBounceRateLast7Days() {
    const res = await this.runReport([{ name: 'bounceRate' }]);
    return Number(res?.rows?.[0]?.metricValues?.[0]?.value || 0);
  }

  /** Average session duration in seconds */
  async getAverageSessionDuration() {
    const res = await this.runReport([{ name: 'averageSessionDuration' }]);
    return Number(res?.rows?.[0]?.metricValues?.[0]?.value || 0);
  }

  /** Total page views */
  async getPageViews() {
    const res = await this.runReport([{ name: 'screenPageViews' }]);
    return Number(res?.rows?.[0]?.metricValues?.[0]?.value || 0);
  }

  // ===== CTA CLICKS & CONVERSION =====

  /** Get clicks for specific CTA buttons */
  async getCtaClicks(ctaName: string) {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }]
    );
    const found = res?.rows?.find(r => r.dimensionValues?.[0]?.value === ctaName);
    return Number(found?.metricValues?.[0]?.value || 0);
  }

  /** Get all CTA clicks (register, login, courses, pricing) */
  async getCtaClicksBundle(days = 7) {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    const counts = { register: 0, login: 0, courses: 0, pricing: 0 };
    for (const row of res?.rows ?? []) {
      const eventName = row.dimensionValues?.[0]?.value;
      const val = Number(row.metricValues?.[0]?.value || 0);
      if (eventName === 'click_register') counts.register = val;
      if (eventName === 'click_login') counts.login = val;
      if (eventName === 'click_courses') counts.courses = val;
      if (eventName === 'click_pricing') counts.pricing = val;
    }
    return counts;
  }

  /** Click-through rate for specific CTA */
  async getCtaClickThroughRate(ctaName: string) {
    const clicks = await this.getCtaClicks(ctaName);
    const sessions = await this.getSessionsLast7Days();
    return sessions > 0 ? (clicks / sessions) * 100 : 0;
  }

  /** Overall CTR for all CTAs */
  async getOverallCtr() {
    const ctaClicks = await this.getCtaClicksBundle();
    const totalClicks = ctaClicks.register + ctaClicks.login + ctaClicks.courses + ctaClicks.pricing;
    const sessions = await this.getSessionsLast7Days();
    return sessions > 0 ? (totalClicks / sessions) * 100 : 0;
  }

  // ===== SCROLL DEPTH =====

  /** Average scroll percentage */
  async getAverageScrollPercentage() {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }]
    );
    
    let totalScroll = 0;
    let totalEvents = 0;
    
    for (const row of res?.rows ?? []) {
      const eventName = row.dimensionValues?.[0]?.value;
      const count = Number(row.metricValues?.[0]?.value || 0);
      
      if (eventName === 'scroll_25') { totalScroll += 25 * count; totalEvents += count; }
      if (eventName === 'scroll_50') { totalScroll += 50 * count; totalEvents += count; }
      if (eventName === 'scroll_75') { totalScroll += 75 * count; totalEvents += count; }
      if (eventName === 'scroll_90') { totalScroll += 90 * count; totalEvents += count; }
      if (eventName === 'scroll_100') { totalScroll += 100 * count; totalEvents += count; }
    }
    
    return totalEvents > 0 ? totalScroll / totalEvents : 0;
  }

  /** Scroll depth buckets */
  async getScrollBuckets(days = 7) {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    const buckets = { s25: 0, s50: 0, s75: 0, s90: 0, s100: 0 };
    for (const row of res?.rows ?? []) {
      const e = row.dimensionValues?.[0]?.value;
      const v = Number(row.metricValues?.[0]?.value || 0);
      if (e === 'scroll_25') buckets.s25 = v;
      if (e === 'scroll_50') buckets.s50 = v;
      if (e === 'scroll_75') buckets.s75 = v;
      if (e === 'scroll_90') buckets.s90 = v;
      if (e === 'scroll_100') buckets.s100 = v;
    }
    return buckets;
  }

  // ===== TRAFFIC SOURCE & MEDIUM =====

  /** Traffic source and medium breakdown */
  async getTrafficSourceMedium() {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'sessionSource' }, { name: 'sessionMedium' }]
    );
    return res?.rows?.map(r => ({
      source: r.dimensionValues?.[0]?.value,
      medium: r.dimensionValues?.[1]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) || [];
  }

  /** Top traffic sources */
  async getTopTrafficSources(limit = 10) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'sessionSource' }]
    );
    return res?.rows?.slice(0, limit).map(r => ({
      source: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) || [];
  }

  // ===== NEW VS RETURNING USERS =====

  /** New vs Returning users breakdown */
  async getNewVsReturningUsers() {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'newVsReturning' }]
    );
    return res?.rows?.map(r => ({
      type: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) || [];
  }

  /** New vs Returning users with more details */
  async getNewVsReturning(days = 7) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'newVsReturning' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    let newUsers = 0;
    let returningUsers = 0;
    for (const row of res?.rows ?? []) {
      if (row.dimensionValues?.[0]?.value === 'new') {
        newUsers = Number(row.metricValues?.[0]?.value);
      }
      if (row.dimensionValues?.[0]?.value === 'returning') {
        returningUsers = Number(row.metricValues?.[0]?.value);
      }
    }
    return { newUsers, returningUsers };
  }

  // ===== NAVIGATION PATH / FLOW =====

  /** Top pages with navigation data */
  async getTopPages(limit = 10, days = 7) {
    const res = await this.runReport(
      [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
      [{ name: 'pagePath' }, { name: 'pageTitle' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.slice(0, limit).map(r => ({
      path: r.dimensionValues?.[0]?.value,
      title: r.dimensionValues?.[1]?.value,
      pageViews: Number(r.metricValues?.[0]?.value || 0),
      avgSessionDurationSec: Number(r.metricValues?.[1]?.value || 0),
      bounceRate: Number(r.metricValues?.[2]?.value || 0),
    })) ?? [];
  }

  /** Navigation flow (entry and exit pages) */
  async getNavigationFlow(days = 7) {
    const entryRes = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'landingPage' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    const exitRes = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'exitPage' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return {
      entryPages: entryRes?.rows?.map(r => ({
        page: r.dimensionValues?.[0]?.value,
        sessions: Number(r.metricValues?.[0]?.value),
      })) || [],
      exitPages: exitRes?.rows?.map(r => ({
        page: r.dimensionValues?.[0]?.value,
        sessions: Number(r.metricValues?.[0]?.value),
      })) || [],
    };
  }

  // ===== FORM SUBMISSIONS =====

  /** Form submissions count */
  async getFormSubmissions() {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }]
    );
    const found = res?.rows?.find(r => r.dimensionValues?.[0]?.value === 'form_submit');
    return Number(found?.metricValues?.[0]?.value || 0);
  }

  /** Form submissions by form type */
  async getFormSubmissionsByType() {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }, { name: 'customEvent:form_type' }]
    );
    return res?.rows?.map(r => ({
      formType: r.dimensionValues?.[1]?.value || 'unknown',
      count: Number(r.metricValues?.[0]?.value || 0),
    })) || [];
  }

  // ===== HOVER EVENTS =====

  /** Hover events count */
  async getHoverEvents() {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }]
    );
    const found = res?.rows?.find(r => r.dimensionValues?.[0]?.value === 'hover');
    return Number(found?.metricValues?.[0]?.value || 0);
  }

  /** Hover events by element */
  async getHoverEventsByElement() {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'eventName' }, { name: 'customEvent:element_id' }]
    );
    return res?.rows?.map(r => ({
      elementId: r.dimensionValues?.[1]?.value || 'unknown',
      count: Number(r.metricValues?.[0]?.value || 0),
    })) || [];
  }

  // ===== ACQUISITION & CHANNELS =====

  /** Acquisition channels */
  async getAcquisition(days = 7, limit = 10) {
    const res = await this.runReport(
      [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'engagedSessions' },
        { name: 'bounceRate' },
      ],
      [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'sessionDefaultChannelGroup' },
      ],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.slice(0, limit).map(r => ({
      source: r.dimensionValues?.[0]?.value,
      medium: r.dimensionValues?.[1]?.value,
      channelGroup: r.dimensionValues?.[2]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
      activeUsers: Number(r.metricValues?.[1]?.value),
      engagedSessions: Number(r.metricValues?.[2]?.value),
      bounceRate: Number(r.metricValues?.[3]?.value),
    })) ?? [];
  }

  // ===== DEVICES & TECHNOLOGY =====

  /** Device breakdown */
  async getDevices(days = 7) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'deviceCategory' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.map(r => ({
      device: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) ?? [];
  }

  /** Browser breakdown */
  async getBrowsers(days = 7) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'browser' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.map(r => ({
      browser: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) ?? [];
  }

  // ===== GEOGRAPHIC DATA =====

  /** Countries */
  async getCountries(days = 7, limit = 10) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'country' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.slice(0, limit).map(r => ({
      country: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) ?? [];
  }

  /** Cities */
  async getCities(days = 7, limit = 10) {
    const res = await this.runReport(
      [{ name: 'sessions' }],
      [{ name: 'city' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows?.slice(0, limit).map(r => ({
      city: r.dimensionValues?.[0]?.value,
      sessions: Number(r.metricValues?.[0]?.value),
    })) ?? [];
  }

  // ===== TIMESERIES DATA =====

  /** Page views timeseries */
  async getPageViewsTimeseries(days = 7) {
    const res = await this.runReport(
      [{ name: 'screenPageViews' }, { name: 'sessions' }],
      [{ name: 'date' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );
    return res?.rows?.map(r => ({
      date: r.dimensionValues?.[0]?.value,
      pageViews: Number(r.metricValues?.[0]?.value),
      sessions: Number(r.metricValues?.[1]?.value),
    })) ?? [];
  }

  /** Event timeseries */
  async getEventTimeseries(eventName: string, days = 7) {
    const res = await this.runReport(
      [{ name: 'eventCount' }],
      [{ name: 'date' }, { name: 'eventName' }],
      { startDate: `${days}daysAgo`, endDate: 'today' }
    );

    return res?.rows
      ?.filter(r => r.dimensionValues?.[1]?.value === eventName)
      ?.map(r => ({
        date: r.dimensionValues?.[0]?.value,
        count: Number(r.metricValues?.[0]?.value || 0),
      })) ?? [];
  }

  // ===== SUMMARY & OVERVIEW =====

  /** Summary 7 days */
  async getSummary7d() {
    const res = await this.runReport(
      [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
        { name: 'engagementTime' },
        { name: 'bounceRate' },
      ],
    );

    const m = res?.rows?.[0]?.metricValues ?? [];
    return {
      pageViews: Number(m[0]?.value || 0),
      sessions: Number(m[1]?.value || 0),
      activeUsers: Number(m[2]?.value || 0),
      avgSessionDurationSec: Number(m[3]?.value || 0),
      engagementDurationSec: Number(m[4]?.value || 0),
      bounceRate: Number(m[5]?.value || 0),
    };
  }

  /** Comprehensive analytics overview */
  async getAnalyticsOverview(days = 7) {
    const [
      summary,
      ctaClicks,
      scrollBuckets,
      newReturning,
      topPages,
      acquisition,
      devices,
      countries,
    ] = await Promise.all([
      this.getSummary7d(),
      this.getCtaClicksBundle(days),
      this.getScrollBuckets(days),
      this.getNewVsReturning(days),
      this.getTopPages(10, days),
      this.getAcquisition(days, 10),
      this.getDevices(days),
      this.getCountries(days, 10),
    ]);

    return {
      summary,
      ctaClicks,
      scrollBuckets,
      newReturning,
      topPages,
      acquisition,
      devices,
      countries,
      averageScrollPercentage: await this.getAverageScrollPercentage(),
      overallCtr: await this.getOverallCtr(),
      formSubmissions: await this.getFormSubmissions(),
      hoverEvents: await this.getHoverEvents(),
    };
  }

  // ===== LEGACY METHODS (for backward compatibility) =====

  /** Legacy method - Session duration avg */
  async getAvgSessionDuration() {
    return this.getAverageSessionDuration();
  }

  /** Legacy method - Event count by eventName */
  async getEventCount(eventName: string) {
    return this.getCtaClicks(eventName);
  }

  /** Legacy method - Click-through rate */
  async getClickRate(eventName: string) {
    return this.getCtaClickThroughRate(eventName);
  }

  /** Legacy method - Scroll depth */
  async getScrollDepth() {
    return this.getAverageScrollPercentage();
  }
}
