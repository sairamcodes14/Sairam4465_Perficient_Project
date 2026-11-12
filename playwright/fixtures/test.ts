import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ContactPage } from '../pages/ContactPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { createRegistrationUser } from '../test-data/users';
import { appEnv } from '../utils/env';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactPage: ContactPage;
  registrationPage: RegistrationPage;
  authenticatedUser: { email: string; password: string };
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  contactPage: async ({ page }, use) => use(new ContactPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  authenticatedUser: async ({ homePage, loginPage, registrationPage }, use) => {
    if (appEnv.testUserEmail && appEnv.testUserPassword) {
      await use({ email: appEnv.testUserEmail, password: appEnv.testUserPassword });
      return;
    }

    const user = createRegistrationUser();
    await homePage.goto();
    await homePage.openLogin();
    await registrationPage.startSignup(user.name, user.email);
    await registrationPage.completeRegistration(user);
    await registrationPage.expectAccountCreated();
    await registrationPage.continue();
    await loginPage.logout();
    await use({ email: user.email, password: user.password });
  }
});

export { expect };
