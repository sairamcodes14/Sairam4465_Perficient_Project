import { test } from '../../fixtures/test';

test.describe('Authenticated login and logout', () => {
  test.describe.configure({ timeout: 90_000 });

  test('logs in with valid credentials', async ({ homePage, loginPage, authenticatedUser }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await loginPage.expectLoggedIn();
  });

  test('logs out successfully', async ({ homePage, loginPage, authenticatedUser }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await loginPage.expectLoggedIn();
    await loginPage.logout();
    await loginPage.expectLoginPage();
  });
});
