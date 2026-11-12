import { expect, test } from '@playwright/test';
import { mockJsonRequest } from '../../utils/network';

test('mocks a JSON API response for network interception validation', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await mockJsonRequest(page, '**/api/example', {
    status: 'mocked',
    message: 'network interception works'
  });

  const response = await page.evaluate(async () => {
    const result = await fetch('/api/example');
    return result.json();
  });

  expect(response).toEqual({
    status: 'mocked',
    message: 'network interception works'
  });
});
