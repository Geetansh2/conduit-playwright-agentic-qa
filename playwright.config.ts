import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",

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