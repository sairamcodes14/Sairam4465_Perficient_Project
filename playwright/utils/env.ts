import { testSettings } from '../config/test-settings';

export const appEnv = {
  baseUrl: testSettings.baseUrl,
  testUserEmail: process.env.TEST_USER_EMAIL || '',
  testUserPassword: process.env.TEST_USER_PASSWORD || '',
  isCi: testSettings.ci
};

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
