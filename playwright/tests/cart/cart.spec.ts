import { test } from '../../fixtures/test';

test('adds a product to the cart', async ({ homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.openProducts();
  await productsPage.addFirstProductToCart();
  await homePage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductRows();
});
