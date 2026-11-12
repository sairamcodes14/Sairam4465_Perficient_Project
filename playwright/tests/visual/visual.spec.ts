import { test, expect } from '../../fixtures/test';

test('home page visual baseline', async ({ page, homePage }) => {
  await homePage.goto();
  test.setTimeout(90_000);
  await expect(page.locator('.header-middle')).toHaveScreenshot('home-header.png', {
    animations: 'disabled'
  });
});
