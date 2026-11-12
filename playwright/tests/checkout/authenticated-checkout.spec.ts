import { test } from '../../fixtures/test';

test.describe('Authenticated checkout', () => {
  test.describe.configure({ timeout: 90_000 });

  test('completes the checkout flow to payment', async ({
    homePage, loginPage, productsPage, cartPage, checkoutPage, authenticatedUser
  }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await loginPage.expectLoggedIn();
    await homePage.openProducts();
    await productsPage.addFirstProductToCart();
    await homePage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectAddressSection();
    await checkoutPage.addOrderComment('Playwright checkout validation');
    await checkoutPage.placeOrder();
  });

  test('places an order with valid payment details', async ({
    homePage, loginPage, productsPage, cartPage, checkoutPage, authenticatedUser
  }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await loginPage.expectLoggedIn();
    await homePage.openProducts();
    await productsPage.addFirstProductToCart();
    await homePage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await checkoutPage.pay({
      name: 'Playwright Tester',
      number: '4111111111111111',
      cvc: '123',
      month: '12',
      year: '2030'
    });
    await checkoutPage.expectOrderPlaced();
  });
});
