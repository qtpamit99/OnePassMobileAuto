const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 60000,
  retries: 3,
  workers: 2,
  reporter: [
    ['list'], // Console output
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' // Disable auto-opening
    }]
  ],
  use: {
    screenshot: 'on-failure',
    video: 'retain-on-failure',
    trace: 'on-failure'
  },
  projects: [
    {
      name: 'Smoke',
      testMatch: ['purchaseFlow.spec.js'],
      use: { browserName: 'chromium' }
    },
    {
      name: 'SmokeFirefox',
      testMatch: ['purchaseFlow.spec.js'],
      use: { browserName: 'firefox' }
    },
    {
      name: 'SmokeWebkit',
      testMatch: ['purchaseFlow.spec.js'],
      use: { browserName: 'webkit' }
    },
    {
      name: 'SmokeMobile',
      testMatch: ['purchaseFlow.spec.js'],
      use: { ...devices['iPhone 14'] }
    },
    {
      name: 'Regression',
      testMatch: ['purchaseFlow.spec.js', 'categoryFilter.spec.js'],
      use: { browserName: 'chromium' }
    },
    {
      name: 'RegressionFirefox',
      testMatch: ['purchaseFlow.spec.js', 'categoryFilter.spec.js'],
      use: { browserName: 'firefox' }
    },
    {
      name: 'RegressionWebkit',
      testMatch: ['purchaseFlow.spec.js', 'categoryFilter.spec.js'],
      use: { browserName: 'webkit' }
    },
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }
    },
    {
      name: 'Mobile',
      use: { ...devices['iPhone 14'] }
    }
  ]
};

module.exports = config;