import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string) {
    const form = this.page.locator('form').filter({ hasText: 'Login' }).first();
    await form.getByPlaceholder('Email Address').fill(email);
    await form.getByPlaceholder('Password').fill(password);
    await form.getByRole('button', { name: 'Login' }).click();
  }

  async expectLoginError() {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page.getByText(/logged in as/i)).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('link', { name: /logout/i }).click();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
      const loginHeading = this.page.getByRole('heading', { name: /login to your account/i });
      const unavailable = await this.page.getByRole('heading', {
        name: /website is under heavy load|web server is returning an unknown error/i
      }).count();

      if ((response?.status() ?? 200) < 500 && unavailable === 0) {
        await expect(loginHeading).toBeVisible();
        return;
      }

      if (attempt < 4) {
        await this.page.waitForTimeout(2_000 * (attempt + 1));
      }
    }

    throw new Error('The target website remained unavailable after logout');
  }

  async expectLoginPage() {
    await expect(this.page.getByRole('heading', { name: /login to your account/i })).toBeVisible();
  }
}
