import { expect, Page } from '@playwright/test';
import { RegistrationUser } from '../test-data/users';

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  async startSignup(name: string, email: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async completeRegistration(user: RegistrationUser) {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('#password').fill(user.password);
    await this.page.locator('#days').selectOption('1');
    await this.page.locator('#months').selectOption('1');
    await this.page.locator('#years').selectOption('1990');
    await this.page.locator('#first_name').fill(user.firstName);
    await this.page.locator('#last_name').fill(user.lastName);
    await this.page.locator('#address1').fill(user.address);
    await this.page.locator('#country').selectOption({ label: user.country });
    await this.page.locator('#state').fill(user.state);
    await this.page.locator('#city').fill(user.city);
    await this.page.locator('#zipcode').fill(user.zipcode);
    await this.page.locator('#mobile_number').fill(user.mobileNumber);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }

  async expectAccountCreated() {
    await expect(this.page.getByText('Account Created!')).toBeVisible();
  }

  async continue() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
