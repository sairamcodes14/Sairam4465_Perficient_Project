# Automation Exercise Playwright Framework

TypeScript Playwright framework for [Automation Exercise](https://automationexercise.com/).

## Setup

```powershell
npm ci
npx playwright install
Copy-Item .env.example .env
```

Set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env` to use an existing test account. If they are not configured, authenticated tests register a unique temporary account before exercising login, logout, and checkout. This requires the target site to be available and accepting registrations.

## Commands

```powershell
npm test                    # full regression across Chromium, Firefox, and WebKit
npm run test:accessibility  # axe accessibility suite
npm run test:visual        # visual baseline suite
npm run test:headed        # headed execution
npm run typecheck          # TypeScript validation
npm run report             # open HTML report
```

The default Playwright configuration covers Chromium, Firefox, and WebKit locally. CI runs Chromium for a faster pull-request signal and publishes the HTML report and test artifacts.

## Framework layout

- `playwright/pages`: page objects, including registration, checkout/payment, and cart operations
- `playwright/fixtures`: shared typed fixtures
- `playwright/test-data`: environment-independent and environment-driven data
- `playwright/utils`: shared helpers for environment values, assertions, and request mocking
- `playwright/config`: central project settings used by tests and automation setup
- `playwright/tests`: module, accessibility, visual, and network-mocking tests
- `playwright.config.ts`: projects, retries, tracing, screenshots, video, and reporters

Network interception is demonstrated with a mock JSON fetch in `playwright/tests/network/mock-api.spec.ts`, which validates that route interception and request stubs work before browser assertions run.

Visual snapshots are created or updated with:

```powershell
npx playwright test playwright/tests/visual --update-snapshots
```

## Demo flow

Run `npm run test:headed`, then show registration, login/logout, product search, add/remove cart operations, authenticated checkout/payment, contact form, and the generated HTML report. The authenticated flows use configured credentials or automatically register a temporary account.
