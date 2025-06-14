# Test info

- Name: Demoblaze Purchase Flow >> should login, add items to cart, and complete purchase
- Location: C:\Users\Amitu\Playwright_Automation\tests\purchaseFlow.spec.js:11:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.sweet-alert') to be visible

    at OrderPage.confirmPurchase (C:\Users\Amitu\Playwright_Automation\pages\OrderPage.js:29:21)
    at C:\Users\Amitu\Playwright_Automation\tests\purchaseFlow.spec.js:40:5
```

# Page snapshot

```yaml
- dialog "Place order":
  - document:
    - heading "Place order" [level=5]
    - button "Close"
    - text: "Total: 2990 Name:"
    - 'textbox "Total: 2990 Name:"': Pavan Kumar
    - text: "Country:"
    - textbox "Country:": India
    - text: "City:"
    - textbox "City:": Bangalore
    - text: "Credit card:"
    - textbox "Credit card:"
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
    - row "Sony vaio i5 790 Delete":
      - cell:
        - img
      - cell "Sony vaio i5"
      - cell "790"
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
    - row "Nokia lumia 1520 820 Delete":
      - cell:
        - img
      - cell "Nokia lumia 1520"
      - cell "820"
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
    - row "HTC One M9 700 Delete":
      - cell:
        - img
      - cell "HTC One M9"
      - cell "700"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
- heading "Total" [level=2]
- heading "2990" [level=3]
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
   1 | class OrderPage {
   2 |   constructor(page) {
   3 |     this.page = page;
   4 |     this.orderModal = '#orderModal';
   5 |     this.nameField = '#name';
   6 |     this.countryField = '#country';
   7 |     this.cityField = '#city';
   8 |     this.cardField = '#card';
   9 |     this.monthField = '#month';
  10 |     this.yearField = '#year';
  11 |     this.purchaseButton = 'button[onclick="purchaseOrder()"]';
  12 |     this.confirmationModal = '.sweet-alert';
  13 |     this.confirmationMessage = '.sweet-alert h2';
  14 |     this.okButton = 'button.confirm:has-text("OK")';
  15 |   }
  16 |
  17 |   async fillPurchaseDetails(details) {
  18 |     await this.page.waitForSelector(this.orderModal, { state: 'visible' });
  19 |     await this.page.fill(this.nameField, details.name);
  20 |     await this.page.fill(this.countryField, details.country);
  21 |     await this.page.fill(this.cityField, details.city);
  22 |     await this.page.fill(this.cardField, details.card);
  23 |     await this.page.fill(this.monthField, details.month);
  24 |     await this.page.fill(this.yearField, details.year);
  25 |   }
  26 |
  27 |   async confirmPurchase() {
  28 |     await this.page.click(this.purchaseButton);
> 29 |     await this.page.waitForSelector(this.confirmationModal, { state: 'visible' });
     |                     ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  30 |     await this.page.click(this.okButton);
  31 |   }
  32 |
  33 |   async getConfirmationMessage() {
  34 |     return await this.page.textContent(this.confirmationMessage);
  35 |   }
  36 | }
  37 |
  38 | module.exports = { OrderPage };
```