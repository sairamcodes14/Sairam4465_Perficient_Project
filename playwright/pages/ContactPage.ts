import { expect, Page } from '@playwright/test';

export class ContactPage {
  constructor(private readonly page: Page) {}

  async submit(name: string, email: string, subject: string, message: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email', { exact: true }).fill(email);
    await this.page.getByPlaceholder('Subject').fill(subject);
    await this.page.getByPlaceholder('Your Message Here').fill(message);
    await this.page.locator('input[name="upload_file"]').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Automation Exercise contact test')
    });
    this.page.on('dialog', (dialog) => void dialog.accept());
    await this.page.locator('input[data-qa="submit-button"]').click({ force: true, noWaitAfter: true });
    await expect(this.page).toHaveURL(/contact_us/);
  }

  async expectSubmitted() {
    await expect(this.page).toHaveURL(/contact_us/);
  }

  async expectRequiredFields() {
    await expect(this.page.getByPlaceholder('Name')).toBeVisible();
    await expect(this.page.getByPlaceholder('Email', { exact: true })).toBeVisible();
    await expect(this.page.getByPlaceholder('Subject')).toBeVisible();
    await expect(this.page.getByPlaceholder('Your Message Here')).toBeVisible();
  }
}
