import { Page, Route } from '@playwright/test';

export async function mockJsonRequest(page: Page, urlPattern: string | RegExp, payload: unknown) {
  await page.route(urlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(payload)
    });
  });
}
