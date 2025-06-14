# Test info

- Name: Demoblaze Purchase Flow >> should login, add items to cart, and complete purchase @smoke @regression
- Location: C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\tests\purchaseFlow.spec.js:11:3

# Error details

```
Error: browserContext._wrapApiCall: Test ended.
Browser logs:

<launching> C:\Users\Amitu\AppData\Local\ms-playwright\firefox-1482\firefox\firefox.exe -no-remote -wait-for-browser -foreground -profile C:\Users\Amitu\AppData\Local\Temp\playwright_firefoxdev_profile-IYUwU5 -juggler-pipe -silent
<launched> pid=26052
[pid=26052][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 116: unreachable code after return statement
[pid=26052][out] console.warn: services.settings: Ignoring preference override of remote settings server
[pid=26052][out] console.warn: services.settings: Allow by setting MOZ_REMOTE_SETTINGS_DEVTOOLS=1 in the environment
[pid=26052][out] 
[pid=26052][out] Juggler listening to the pipe
[pid=26052][out] console.error: "Warning: unrecognized command line flag" "-foreground"
[pid=26052][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const { BaseTest } = require('../utils/baseTest');
   3 | const { LoginPage } = require('../pages/LoginPage');
   4 | const { HomePage } = require('../pages/HomePage');
   5 | const { CartPage } = require('../pages/CartPage');
   6 | const { OrderPage } = require('../pages/OrderPage');
   7 | const { ConfigLoader } = require('../utils/configLoader');
   8 | const testData = require('../test-data/testData.json');
   9 |
  10 | test.describe('Demoblaze Purchase Flow', () => {
> 11 |   test('should login, add items to cart, and complete purchase @smoke @regression', async ({ page }) => {
     |   ^ Error: browserContext._wrapApiCall: Test ended.
  12 |     const config = ConfigLoader.getConfig(); // Load environment-specific config
  13 |     const baseTest = new BaseTest(page);
  14 |     const loginPage = new LoginPage(page);
  15 |     const homePage = new HomePage(page);
  16 |     const cartPage = new CartPage(page);
  17 |     const orderPage = new OrderPage(page);
  18 |
  19 |     // Navigate to homepage using baseUrl from config
  20 |     await baseTest.navigateTo(config.baseUrl);
  21 |
  22 |     // Login
  23 |     await loginPage.login(config.credentials.username, config.credentials.password);
  24 |     await expect(await loginPage.getWelcomeText()).toContain(config.credentials.username);
  25 |
  26 |     // Add items to cart
  27 |     for (const item of testData.items) {
  28 |       await homePage.addItemToCart(item);
  29 |     }
  30 |
  31 |     // Navigate to cart and verify items
  32 |     await cartPage.navigateToCart();
  33 |     const cartItems = await cartPage.getCartItems();
  34 |     for (const item of testData.items) {
  35 |       expect(cartItems).toContain(item);
  36 |     }
  37 |
  38 |     // Complete purchase
  39 |     await cartPage.proceedToPurchase();
  40 |     await orderPage.fillPurchaseDetails(testData.purchaseDetails);
  41 |     await orderPage.confirmPurchase();
  42 |     await expect(await orderPage.getConfirmationMessage()).toBe('Thank you for your purchase!');
  43 |
  44 |     // Verify logout button
  45 |     await expect(await loginPage.isLogoutButtonVisible()).toBe(true);
  46 |   });
  47 | });
```