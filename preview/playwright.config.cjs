const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 20000,
  workers: 1,
  reporter: 'list',
  use: { channel: 'msedge', headless: true, reducedMotion: 'reduce' },
});
