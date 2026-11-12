import { expect, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  }

  async search(term: string) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await this.page.getByPlaceholder('Search Product').fill(term);
      await this.page.locator('#submit_search').click();

      const overloaded = await this.page.getByRole('heading', {
        name: /website is under heavy load/i
      }).count();
      if (overloaded === 0) {
        return;
      }

      if (attempt < 2) {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
        await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
      }
    }

    throw new Error('The target website remained overloaded while searching products');
  }

  async expectProduct(term: string) {
    await expect(this.page.locator('.productinfo p').filter({ hasText: term }).first()).toBeVisible();
  }

  async addFirstProductToCart() {
    const addToCartButton = this.page.locator('.productinfo .add-to-cart').first();
    await addToCartButton.waitFor({ state: 'visible' });

    let responseStatus = 0;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const addToCartResponse = this.page.waitForResponse(response =>
        response.url().includes('/add_to_cart/1')
      );
      await addToCartButton.click();

      const response = await addToCartResponse;
      responseStatus = response.status();
      if (response.ok()) {
        break;
      }

      if (responseStatus < 500 || attempt === 2) {
        throw new Error(`Adding the product to the cart failed with status ${responseStatus}`);
      }

      await this.page.waitForTimeout(1_000 * (attempt + 1));
    }

    const continueShoppingButton = this.page.getByRole('button', { name: /continue shopping/i });
    await continueShoppingButton.waitFor({ state: 'visible' });
    await continueShoppingButton.click();
  }
}
