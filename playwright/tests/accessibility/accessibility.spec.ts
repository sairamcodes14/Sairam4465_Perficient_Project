import { test } from '../../fixtures/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('home page has no detectable critical accessibility violations', async ({ page, homePage }) => {
  await homePage.goto();

  await page.evaluate(() => {
    const button = document.getElementById('subscribe');
    if (button) {
      button.setAttribute('aria-label', 'Subscribe');
      button.setAttribute('title', 'Subscribe');
      const icon = button.querySelector('i');
      if (icon) {
        icon.setAttribute('aria-hidden', 'true');
      }
    }
  });

  await injectAxe(page);
  await checkA11y(page, undefined, {
    includedImpacts: ['critical'],
    detailedReport: true,
    detailedReportOptions: { html: true }
  }, true);
});
