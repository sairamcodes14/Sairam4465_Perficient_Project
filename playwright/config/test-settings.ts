export const testSettings = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  defaultTimeout: 45_000,
  browsers: ['chromium', 'firefox', 'webkit'] as const,
  accessibility: {
    failOnCritical: true,
    reportDir: 'playwright-report'
  },
  ci: process.env.CI === 'true' || process.env.CI === '1'
};
