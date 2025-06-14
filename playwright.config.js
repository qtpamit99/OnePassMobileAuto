/** @type {import('@playwright/test').PlaywrightTestConfig} */
const { devices } = require('@playwright/test'); // Import devices for mobile emulation

const config = {
  testDir: './tests',
  timeout: 60000, // 60 seconds timeout for each test
  retries: 1, // Retry failed tests once
  workers: 3, // Run 3 tests in parallel
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }], // HTML report
    ['list'], // Console output
  ],
  use: {
    screenshot: 'only-on-failure', // Take screenshots on failure
    video: 'retain-on-failure', // Record videos on failure
    trace: 'on-first-retry', // Trace on retry
  },
  projects: [
    {
      name: 'Smoke',
      testMatch: ['purchaseFlow.spec.js'], // Only run purchaseFlow.spec.js for Smoke
      use: { browserName: 'chromium' },
    },
    {
      name: 'Regression',
      testMatch: ['purchaseFlow.spec.js', 'categoryFilter.spec.js'], // Run both tests for Regression
      use: { browserName: 'chromium' },
    },
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'Mobile', // New project for mobile viewport
      use: {
        ...devices['iPhone 14'], // Emulate iPhone 14 (viewport: 390x844, userAgent, etc.)
      },
    },
  ],
};

module.exports = config;