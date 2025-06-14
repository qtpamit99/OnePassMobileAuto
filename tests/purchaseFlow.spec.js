const { test, expect } = require('@playwright/test');
const { BaseTest } = require('../utils/baseTest');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { OrderPage } = require('../pages/OrderPage');
const { ConfigLoader } = require('../utils/configLoader');
const testData = require('../test-data/testData.json');

test.describe('Demoblaze Purchase Flow', () => {
  test('should login, add items to cart, and complete purchase @smoke @regression', async ({ page }) => {
    const config = ConfigLoader.getConfig(); // Load environment-specific config
    const baseTest = new BaseTest(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const orderPage = new OrderPage(page);

    // Navigate to homepage using baseUrl from config
    await baseTest.navigateTo(config.baseUrl);

    // Login
    await loginPage.login(config.credentials.username, config.credentials.password);
    await expect(await loginPage.getWelcomeText()).toContain(config.credentials.username);

    // Add items to cart
    for (const item of testData.items) {
      await homePage.addItemToCart(item);
    }

    // Navigate to cart and verify items
    await cartPage.navigateToCart();
    const cartItems = await cartPage.getCartItems();
    for (const item of testData.items) {
      expect(cartItems).toContain(item);
    }

    // Complete purchase
    await cartPage.proceedToPurchase();
    await orderPage.fillPurchaseDetails(testData.purchaseDetails);
    await orderPage.confirmPurchase();
    await expect(await orderPage.getConfirmationMessage()).toBe('Thank you for your purchase!');

    // Verify logout button
    await expect(await loginPage.isLogoutButtonVisible()).toBe(true);
  });
});