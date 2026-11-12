import { test } from '../../fixtures/test';
import { users } from '../../test-data/users';

test.describe('Login module', () => {
  test('shows an error for invalid credentials', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(users.invalid.email, users.invalid.password);
    await loginPage.expectLoginError();
  });

  test('logs in with valid credentials', async ({ homePage, loginPage, authenticatedUser }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await loginPage.expectLoggedIn();
  });
});
