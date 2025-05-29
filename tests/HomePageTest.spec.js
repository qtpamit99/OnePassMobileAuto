const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('Verify Home Page Title and URL', async ({ page }) => {
    await page.goto('https://demoblaze.com/index.html');
    
    const title = await page.title();
    console.log('Page title is:', title);

    await expect(title).toBe('STORE');
    await expect(page.url()).toBe('https://demoblaze.com/index.html');

    await page.close();
  });
});
