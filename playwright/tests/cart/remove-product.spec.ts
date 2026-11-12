import { test } from '../../fixtures/test';

test('removes a product from the cart', async ({ homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.openProducts();
  await productsPage.addFirstProductToCart();
  await homePage.openCart();
  await cartPage.expectProductRows();
  await cartPage.removeFirstProduct();
  await cartPage.expectCartEmpty();
});
