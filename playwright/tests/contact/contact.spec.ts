import { test } from '../../fixtures/test';

test('submits the contact form', async ({ homePage, contactPage }) => {
  await homePage.goto();
  await homePage.openContact();
  await contactPage.expectRequiredFields();
  await contactPage.submit('Automation Tester', 'tester@example.com', 'Framework test', 'Contact form smoke test');
  await contactPage.expectSubmitted();
});
