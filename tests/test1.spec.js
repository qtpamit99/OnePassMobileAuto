const { test, expect } = require('@playwright/test');

test.describe('Demoblaze Purchase Flow', () => {
  test('should login, add items to cart, and complete purchase', async ({ page }) => {
    // Step 1: Navigate to Demoblaze homepage
    await page.goto('https://www.demoblaze.com/index.html');

    // Step 2: Login to the website
    await page.click('#login2'); // Click the "Log in" link to open the modal
    await page.waitForSelector('#logInModal', { state: 'visible' }); // Ensure modal is visible
    await page.fill('#loginusername', 'pavanol'); // Enter username
    await page.fill('#loginpassword', 'test@123'); // Enter password
    await page.click('button[onclick="logIn()"]'); // Click "Log in" button in the modal
    await page.waitForSelector('#nameofuser', { state: 'visible' }); // Wait for login to complete
    const welcomeText = await page.textContent('#nameofuser');
    await expect(welcomeText).toContain('pavanol'); // Verify successful login

    // Step 3: Add 3-4 items to the cart
    const itemsToAdd = [
      'Samsung galaxy s6',
      'Nokia lumia 1520',
      'HTC One M9',
      'Sony vaio i5',
      'Sony xperia z5'
    ];

    for (const item of itemsToAdd) {
      let itemFound = false;

      // Handle pagination by looping through pages until the item is found
      while (!itemFound) {
        // Wait for the product grid to load
        await page.waitForSelector('.card-title a', { timeout: 5000 });

        // Check if the item exists on the current page
        const itemLocator = page.locator(`.card-title a:has-text("${item}")`);
        const itemCount = await itemLocator.count();

        if (itemCount > 0) {
          // Item found, click on it
          await itemLocator.first().click();
          itemFound = true;
        } else {
          // Item not found, check if there's a "Next" button
          const nextButton = page.locator('#next2');
          const nextButtonVisible = await nextButton.isVisible();

          if (nextButtonVisible) {
            await nextButton.click(); // Go to the next page
            await page.waitForTimeout(1000); // Wait for the next page to load
          } else {
            throw new Error(`Item "${item}" not found on any page`);
          }
        }
      }

      // Wait for the product page to load
      await page.waitForSelector('h2.name');

      // Attach dialog handler BEFORE clicking "Add to cart"
      page.once('dialog', async dialog => {
        await expect(dialog.message()).toContain('Product added');
        await dialog.accept();
      });

      // Add the item to the cart
      await page.click('a[onclick*="addToCart"]');

      // Small delay to ensure alert is processed and product is added
      await page.waitForTimeout(1000);

      // Go back to the homepage to add the next item
      await page.click('a.nav-link:has-text("Home")');
      await page.waitForTimeout(1000); // Small delay to ensure page loads
    }

    // Step 4: Navigate to the cart
    await page.click('#cartur'); // Click on the "Cart" link
    await page.waitForSelector('#tbodyid'); // Wait for cart table to load

    // Step 5: Verify items in the cart
    const cartItems = await page.$$eval('#tbodyid tr', rows =>
      rows.map(row => row.querySelector('td:nth-child(2)').textContent.trim())
    );
    for (const item of itemsToAdd) {
      expect(cartItems).toContain(item);
    }

    // Step 6: Proceed to purchase
    await page.click('button:has-text("Place Order")'); // Click "Place Order" button
    await page.waitForSelector('#orderModal', { state: 'visible' }); // Wait for the order modal

    // Step 7: Fill in purchase details
    await page.fill('#name', 'Pavan Kumar');
    await page.fill('#country', 'India');
    await page.fill('#city', 'Bangalore');
    await page.fill('#card', '1234567890123456');
    await page.fill('#month', '12');
    await page.fill('#year', '2025');

    // Step 8: Confirm the purchase
    await page.click('button[onclick="purchaseOrder()"]'); // Click "Purchase" button

    // Step 9: Verify purchase confirmation
    await page.waitForSelector('.sweet-alert', { state: 'visible' });
    const confirmationMessage = await page.textContent('.sweet-alert h2');
    await expect(confirmationMessage).toBe('Thank you for your purchase!');

    // Step 10: Close the confirmation dialog
    await page.click('button.confirm:has-text("OK")');

        //verify logout button  
    const logoutButton = await page.locator('#logout2');
    await expect(logoutButton).toBeVisible();
   //await expect(logoutButton).not.toBeVisible();


    // Step 11: Close the page
    await page.close();
  });
});
