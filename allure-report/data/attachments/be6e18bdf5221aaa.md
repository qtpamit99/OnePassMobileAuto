# Test info

- Name: Demoblaze Purchase Flow >> should login, add items to cart, and complete purchase @smoke @regression
- Location: C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\tests\purchaseFlow.spec.js:11:3

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#login2')
    - locator resolved to <a href="#" id="login2" class="nav-link" data-toggle="modal" data-target="#logInModal">Log in</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable

    at LoginPage.login (C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\pages\LoginPage.js:17:21)
    at C:\Users\Amitu\OneDrive\Desktop\Playwright_Framework\OnePassMobileAuto\tests\purchaseFlow.spec.js:23:21
```

# Test source

```ts
   1 | const { ConfigLoader } = require('../utils/configLoader');
   2 |
   3 | class LoginPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.loginLink = '#login2';
   7 |     this.loginModal = '#logInModal';
   8 |     this.usernameField = '#loginusername';
   9 |     this.passwordField = '#loginpassword';
  10 |     this.loginButton = 'button[onclick="logIn()"]';
  11 |     this.welcomeText = '#nameofuser';
  12 |     this.logoutButton = '#logout2';
  13 |   }
  14 |
  15 |   async login(username, password) {
  16 |     const config = ConfigLoader.getConfig();
> 17 |     await this.page.click(this.loginLink);
     |                     ^ Error: page.click: Target page, context or browser has been closed
  18 |     await this.page.waitForSelector(this.loginModal, { state: 'visible', timeout: config.timeout });
  19 |     await this.page.fill(this.usernameField, username);
  20 |     await this.page.fill(this.passwordField, password);
  21 |     await this.page.click(this.loginButton);
  22 |     await this.page.waitForSelector(this.welcomeText, { state: 'visible', timeout: config.timeout });
  23 |   }
  24 |
  25 |   async getWelcomeText() {
  26 |     return await this.page.textContent(this.welcomeText);
  27 |   }
  28 |
  29 |   async isLogoutButtonVisible() {
  30 |     return await this.page.locator(this.logoutButton).isVisible();
  31 |   }
  32 | }
  33 |
  34 | module.exports = { LoginPage };
```