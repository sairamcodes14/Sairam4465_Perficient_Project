import { appEnv } from '../utils/env';

export type RegistrationUser = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export function createRegistrationUser(): RegistrationUser {
  const id = Date.now();
  return {
    name: `Playwright Tester ${id}`,
    email: `playwright.${id}@example.com`,
    password: `Pw-${id}-secure`,
    firstName: 'Playwright',
    lastName: 'Tester',
    address: '1 Automation Street',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    zipcode: '500001',
    mobileNumber: '9876543210'
  };
}

export const users = {
  valid: {
    email: appEnv.testUserEmail,
    password: appEnv.testUserPassword
  },
  invalid: {
    email: 'invalid-user@example.com',
    password: 'incorrect-password'
  }
};
