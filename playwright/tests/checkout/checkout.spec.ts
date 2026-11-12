import { test } from '../../fixtures/test';

test('requires authentication before checkout', async ({ homePage, productsPage, cartPage, checkoutPage }) => {
  await homePage.goto();
  await homePage.openProducts();
  await productsPage.addFirstProductToCart();
  await homePage.openCart();
  await cartPage.expectProductRows();
  await cartPage.proceedToCheckout();
  await checkoutPage.expectLoginPrompt();
});
