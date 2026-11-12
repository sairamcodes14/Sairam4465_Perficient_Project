import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  private async navigate(path: string) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      const unavailable = await this.page.getByRole('heading', {
        name: /website is under heavy load|web server is returning an unknown error/i
      }).count();
      if ((response?.status() ?? 200) < 500 && unavailable === 0) {
        return;
      }

      if (attempt < 4) {
        await this.page.waitForTimeout(2_000 * (attempt + 1));
      }
    }

    throw new Error(`The target website remained unavailable while navigating to ${path}`);
  }

  async goto() {
    await this.navigate('/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async openLogin() {
    await this.navigate('/login');
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.page.getByRole('heading', { name: /login to your account/i })).toBeVisible();
  }

  async openProducts() {
    await this.navigate('/products');
    await expect(this.page).toHaveURL(/\/products(\/)?$/);
    await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  }

  async openCart() {
    await this.navigate('/view_cart');
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
  }

  async openContact() {
    await this.navigate('/contact_us');
    await expect(this.page).toHaveURL(/\/contact_us/);
  }
}
