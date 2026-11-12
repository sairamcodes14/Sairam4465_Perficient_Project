import { test } from '../../fixtures/test';

test('searches and displays a product', async ({ homePage, productsPage }) => {
  await homePage.goto();
  await homePage.openProducts();
  await productsPage.expectLoaded();
  await productsPage.search('Blue Top');
  await productsPage.expectProduct('Blue Top');
});
