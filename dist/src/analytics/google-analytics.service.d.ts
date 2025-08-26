export declare class GoogleAnalyticsService {
    private analyticsDataClient;
    private propertyId?;
    constructor();
    getActiveUsersLast7Days(): Promise<number>;
    getSessionsLast7Days(): Promise<number>;
    getBounceRateLast7Days(): Promise<number>;
}
