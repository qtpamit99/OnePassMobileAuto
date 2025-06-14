const { test, expect } = require('@playwright/test');
const { BaseTest } = require('../utils/baseTest');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { ConfigLoader } = require('../utils/configLoader');
const testData = require('../test-data/testData.json');

test.describe('Demoblaze Category Filter Validation', () => {
  test('should filter products by category and add a product to cart @regression', async ({ page }) => {
    const config = ConfigLoader.getConfig(); // Load environment-specific config
    const baseTest = new BaseTest(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Navigate to homepage using baseUrl from config
    await baseTest.navigateTo(config.baseUrl);

    // Login
    await loginPage.login(config.credentials.username, config.credentials.password);
    await expect(await loginPage.getWelcomeText()).toContain(config.credentials.username);

    // Select the category (e.g., Laptops)
    const category = testData.categoryFilter.category;
    await homePage.selectCategory(category);

    // Verify that all expected products are present in the visible products
    const visibleProducts = await homePage.getVisibleProducts();
    const expectedProducts = testData.categoryFilter.expectedProducts;
    for (const expectedProduct of expectedProducts) {
      expect(visibleProducts).toContain(expectedProduct, `Expected product ${expectedProduct} should be visible in category ${category}`);
    }

    // Add a product from the filtered list to the cart
    const productToAdd = testData.categoryFilter.productToAdd;
    await homePage.addItemToCart(productToAdd);

    // Navigate to cart and verify the product is added
    await cartPage.navigateToCart();
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain(productToAdd, `Product ${productToAdd} should be in the cart`);

    // Verify logout button is still visible
    await expect(await loginPage.isLogoutButtonVisible()).toBe(true);
  });
});