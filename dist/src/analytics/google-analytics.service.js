"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("@google-analytics/data");
const path = require("path");
const fs = require("fs");
let GoogleAnalyticsService = class GoogleAnalyticsService {
    constructor() {
        const candidates = [
            process.env.GA_KEY_PATH,
            path.resolve(process.cwd(), 'keys/ga-service.json'),
            path.resolve(process.cwd(), 'backend/keys/ga-service.json'),
            path.resolve(__dirname, '../../keys/ga-service.json'),
        ].filter((p) => !!p);
        const keyPath = candidates.find((p) => {
            try {
                return fs.existsSync(p);
            }
            catch {
                return false;
            }
        });
        if (!keyPath) {
            this.analyticsDataClient = null;
            return;
        }
        this.analyticsDataClient = new data_1.BetaAnalyticsDataClient({ keyFilename: keyPath });
        this.propertyId = process.env.GA_PROPERTY_ID || '502608463';
    }
    async getActiveUsersLast7Days() {
        if (!this.analyticsDataClient || !this.propertyId)
            return 0;
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                metrics: [{ name: 'activeUsers' }],
            });
            return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
        }
        catch {
            return 0;
        }
    }
    async getSessionsLast7Days() {
        if (!this.analyticsDataClient || !this.propertyId)
            return 0;
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                metrics: [{ name: 'sessions' }],
            });
            return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
        }
        catch {
            return 0;
        }
    }
    async getBounceRateLast7Days() {
        if (!this.analyticsDataClient || !this.propertyId)
            return 0;
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                metrics: [{ name: 'bounceRate' }],
            });
            return Number(response?.rows?.[0]?.metricValues?.[0]?.value || 0);
        }
        catch {
            return 0;
        }
    }
};
exports.GoogleAnalyticsService = GoogleAnalyticsService;
exports.GoogleAnalyticsService = GoogleAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleAnalyticsService);
//# sourceMappingURL=google-analytics.service.js.map