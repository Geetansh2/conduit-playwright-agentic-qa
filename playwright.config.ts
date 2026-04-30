import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",

  reporter: [
    ["list"],
    ["allure-playwright"],
  ],
  // fullyParallel: true, 
  // workers: 8,
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
});