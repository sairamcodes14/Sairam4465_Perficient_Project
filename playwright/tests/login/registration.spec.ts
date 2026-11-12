import { test } from '../../fixtures/test';
import { createRegistrationUser } from '../../test-data/users';

test('registers a new user account', async ({ homePage, registrationPage }) => {
  const user = createRegistrationUser();
  await homePage.goto();
  await homePage.openLogin();
  await registrationPage.startSignup(user.name, user.email);
  await registrationPage.completeRegistration(user);
  await registrationPage.expectAccountCreated();
  await registrationPage.continue();
});
