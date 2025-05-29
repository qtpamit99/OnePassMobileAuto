class HomePage {
  constructor(page) {
    this.page = page;
    this.productGrid = '.card-title a';
    this.nextButton = '#next2';
    this.productName = 'h2.name';
    this.addToCartButton = 'a[onclick*="addToCart"]';
    this.homeLink = 'a.nav-link:has-text("Home")';
  }

  async addItemToCart(item) {
    let itemFound = false;

    while (!itemFound) {
      await this.page.waitForSelector(this.productGrid, { timeout: 6000 });
      const itemLocator = this.page.locator(`.card-title a:has-text("${item}")`);
      const itemCount = await itemLocator.count();

      if (itemCount > 0) {
        await itemLocator.first().click();
        itemFound = true;
      } else {
        const nextButtonVisible = await this.page.locator(this.nextButton).isVisible();
        if (nextButtonVisible) {
          await this.page.locator(this.nextButton).click();
          await this.page.waitForTimeout(2000);
        } else {
          throw new Error(`Item "${item}" not found on any page`);
        }
      }
    }

    await this.page.waitForSelector(this.productName);
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.page.click(this.addToCartButton);
    await this.page.waitForTimeout(2000);
    await this.page.click(this.homeLink);
    await this.page.waitForTimeout(2000);
  }
}

module.exports = { HomePage };