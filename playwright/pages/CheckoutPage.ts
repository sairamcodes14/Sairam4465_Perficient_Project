import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async expectLoginPrompt() {
    await expect(this.page.locator('a[href="/login"]').first()).toBeVisible();
  }

  async expectAddressSection() {
    await expect(this.page.getByText('Address Details')).toBeVisible();
    await expect(this.page.getByText('Review Your Order')).toBeVisible();
  }

  async addOrderComment(comment: string) {
    await this.page.locator('textarea[name="message"]').fill(comment);
  }

  async placeOrder() {
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }

  async pay(card: { name: string; number: string; cvc: string; month: string; year: string }) {
    await this.page.locator('[data-qa="name-on-card"]').fill(card.name);
    await this.page.locator('[data-qa="card-number"]').fill(card.number);
    await this.page.locator('[data-qa="cvc"]').fill(card.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(card.month);
    await this.page.locator('[data-qa="expiry-year"]').fill(card.year);
    await this.page.getByRole('button', { name: /pay and confirm order/i }).click();
  }

  async expectOrderPlaced() {
    await expect(this.page.getByText(/order placed!/i)).toBeVisible();
    await expect(this.page.getByText(/Congratulations! Your order has been confirmed/i)).toBeVisible();
  }
}
