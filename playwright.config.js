/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60000, // 60 seconds timeout for each test
  retries: 1, // Retry failed tests once
  workers: 3, // Run 3 tests in parallel
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }], // HTML report
     ['allure-playwright'],
    ['list'], // Console output
  ],
  use: {
    baseURL: 'https://www.demoblaze.com', // Base URL for all tests
    screenshot: 'only-on-failure', // Take screenshots on failure
    video: 'retain-on-failure', // Record videos on failure
    trace: 'on-first-retry', // Trace on retry
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 30000
    
  },
  projects: [
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
  ],
};

module.exports = config;