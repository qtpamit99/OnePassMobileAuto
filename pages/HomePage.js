const { ConfigLoader } = require('../utils/configLoader');

class HomePage {
  constructor(page) {
    this.page = page;
    this.productGrid = '.card-title a';
    this.nextButton = '#next2';
    this.productName = 'h2.name';
    this.addToCartButton = 'a[onclick*="addToCart"]';
    this.homeLink = 'a.nav-link:has-text("Home")';
    this.categoryLink = 'a.list-group-item';
    this.visibleProducts = '.card-title a';
  }

  async addItemToCart(item) {
    const config = ConfigLoader.getConfig();
    let itemFound = false;

    while (!itemFound) {
      await this.page.waitForSelector(this.productGrid, { timeout: config.timeout });
      const itemLocator = this.page.locator(`.card-title a:has-text("${item}")`);
      const itemCount = await itemLocator.count();

      if (itemCount > 0) {
        await itemLocator.first().click();
        itemFound = true;
      } else {
        const nextButtonVisible = await this.page.locator(this.nextButton).isVisible();
        if (nextButtonVisible) {
          await this.page.locator(this.nextButton).click();
          await this.page.waitForTimeout(2000); // Replace with dynamic wait if needed
        } else {
          throw new Error(`Item "${item}" not found on any page`);
        }
      }
    }

    await this.page.waitForSelector(this.productName, { timeout: config.timeout });
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.page.click(this.addToCartButton);
    await this.page.waitForTimeout(2000); // Replace with dynamic wait if needed
    await this.page.click(this.homeLink);
    await this.page.waitForTimeout(2000); // Replace with dynamic wait if needed
  }

  async selectCategory(category) {
    const config = ConfigLoader.getConfig();
    const categoryLocator = this.page.locator(`${this.categoryLink}:has-text("${category}")`);
    await categoryLocator.click();
    await this.page.waitForTimeout(2000); // Replace with dynamic wait if needed
  }

  async getVisibleProducts() {
    const config = ConfigLoader.getConfig();
    await this.page.waitForSelector(this.visibleProducts, { timeout: config.timeout });
    const products = await this.page.$$eval(this.visibleProducts, elements => 
      elements.map(element => element.textContent.trim())
    );
    return products;
  }
}

module.exports = { HomePage };