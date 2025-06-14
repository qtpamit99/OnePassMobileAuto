# Test info

- Name: Demoblaze Purchase Flow >> should login, add items to cart, and complete purchase @smoke @regression
- Location: C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\tests\purchaseFlow.spec.js:11:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

- Expected  -  0
+ Received  + 10

  Thank you for your purchase!
+     Id: 4157934Amount: 3350 USDCard Number: 1234567890123456Name: Pavan KumarDate: 14/5/2025
+     
+       
+       
+          Not valid
+       
+     
+       Cancel
+       
+         OK
    at C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\tests\purchaseFlow.spec.js:42:60
```

# Page snapshot

```yaml
- dialog "Place order":
  - document:
    - heading "Place order" [level=5]
    - button "Close"
    - text: "Total: 3350 Name:"
    - 'textbox "Total: 3350 Name:"': Pavan Kumar
    - text: "Country:"
    - textbox "Country:": India
    - text: "City:"
    - textbox "City:"
    - text: "Credit card:"
    - textbox "Credit card:": "1234567890123456"
    - text: "Month:"
    - textbox "Month:": "12"
    - text: "Year:"
    - textbox "Year:": "2025"
    - button "Close"
    - button "Purchase"
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: "#"
    - listitem
    - listitem:
      - link "Log out":
        - /url: "#"
    - listitem:
      - link "Welcome pavanol":
        - /url: "#"
    - listitem
- heading "Products" [level=2]
- table:
  - rowgroup:
    - row "Pic Title Price x":
      - cell "Pic"
      - cell "Title"
      - cell "Price"
      - cell "x"
  - rowgroup:
    - row "Nokia lumia 1520 820 Delete":
      - cell:
        - img
      - cell "Nokia lumia 1520"
      - cell "820"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
    - row "HTC One M9 700 Delete":
      - cell:
        - img
      - cell "HTC One M9"
      - cell "700"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
    - row "Sony xperia z5 320 Delete":
      - cell:
        - img
      - cell "Sony xperia z5"
      - cell "320"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
    - row "Samsung galaxy s6 360 Delete":
      - cell:
        - img
      - cell "Samsung galaxy s6"
      - cell "360"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
    - row "Samsung galaxy s6 360 Delete":
      - cell:
        - img
      - cell "Samsung galaxy s6"
      - cell "360"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
    - row "Sony vaio i5 790 Delete":
      - cell:
        - img
      - cell "Sony vaio i5"
      - cell "790"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
- heading "Total" [level=2]
- heading "3350" [level=3]
- button "Place Order"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store 2017
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
  11 |   test('should login, add items to cart, and complete purchase @smoke @regression', async ({ page }) => {
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
> 42 |     await expect(await orderPage.getConfirmationMessage()).toBe('Thank you for your purchase!');
     |                                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  43 |
  44 |     // Verify logout button
  45 |     await expect(await loginPage.isLogoutButtonVisible()).toBe(true);
  46 |   });
  47 | });
```