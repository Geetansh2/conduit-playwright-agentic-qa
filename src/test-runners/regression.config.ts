import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',

  fullyParallel: true,
  workers: 4,

  grep: /@regression/, 
    reporter: [
    ["list"],
    ["allure-playwright"],
  ],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  
});