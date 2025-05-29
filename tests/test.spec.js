const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('should login successfully on Demoblaze', async ({ page }) => {
    // Navigate to the Demoblaze homepage
    await page.goto('https://www.demoblaze.com/index.html');

    // Click on the login button to open the login modal
    await page.click('#login2');

    // Wait for the login modal to be visible (optional, for stability)
    await page.waitForSelector('#logInModal', { state: 'visible' });

    // Fill in the username field using CSS selector
    await page.fill('#loginusername', 'pavanol');

    // Fill in the password field using CSS selector
    await page.fill('#loginpassword', 'test@123');

    // Click the "Log in" button in the modal
    await page.click('button[onclick="logIn()"]');

    // Wait for the login to complete (e.g., check for a welcome message or URL change)
    await page.waitForSelector('#nameofuser', { state: 'visible' });

    // Verify successful login by checking the welcome message
    const welcomeText = await page.textContent('#nameofuser');
    await expect(welcomeText).toContain('pavanol');

    //verify logout button  
    const logoutButton = await page.locator('#logout2');
    await expect(logoutButton).toBeVisible();

    



    // Close the page
    await page.close();
  });
});