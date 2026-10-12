import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 30000,
  },
  use: {
    baseURL: process.env.TEST_URL || "http://127.0.0.1:3000",
    channel: "msedge",
    headless: true,
  },
  workers: 1,
  reporter: "list",
});
