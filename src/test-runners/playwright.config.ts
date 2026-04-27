import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  reporter: [
    ["list"],
    ["allure-playwright"],
  ],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});