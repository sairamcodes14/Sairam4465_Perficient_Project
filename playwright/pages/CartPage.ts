import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
  }

  async expectProductRows() {
    const productRows = this.page.locator('#cart_info_table .cart_description');
    await expect(productRows.first()).toBeVisible({ timeout: 15_000 });
  }

  async removeFirstProduct() {
    const removeResponse = this.page.waitForResponse(response =>
      response.url().includes('/delete_cart/')
    );
    await this.page.locator('.cart_quantity_delete').first().click();

    const response = await removeResponse;
    if (!response.ok()) {
      throw new Error(`Removing the cart product failed with status ${response.status()}`);
    }
  }

  async expectCartEmpty() {
    await expect(this.page.locator('#cart_info_table .cart_description')).toHaveCount(0);
    await expect(this.page.locator('#empty_cart')).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click({ force: true });
  }
}
