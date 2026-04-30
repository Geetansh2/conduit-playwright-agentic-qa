import { defineConfig, devices } from '@playwright/test';

const ALL_PROJECTS: any = {
  chromium: {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  firefox: {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  webkit: {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
};

// ENV value → BROWSERS=chromium,firefox
const browserEnv = process.env.BROWSERS;

// If ENV not set → fallback to ALL
const selectedProjects = browserEnv
  ? browserEnv
      .split(',')
      .map(b => ALL_PROJECTS[b.trim()])
      .filter(Boolean)
  : Object.values(ALL_PROJECTS);

// Safety check
if (!selectedProjects.length) {
  throw new Error(`Invalid BROWSERS value: ${browserEnv}`);
}

export default defineConfig({
  testDir: '../tests',

  fullyParallel: true,
  workers: 8,
  grep: /@ui/,

  // 👇 This is now dynamic
  projects: selectedProjects,

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