import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',

  fullyParallel: true,
  workers: process.env.CI ? 6 : 3,
  grep: /@ui/, 

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  reporter: [
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
}); 