class HomePage {
  constructor(page) {
    this.page = page;
    this.productGrid = '.card-title a';
    this.nextButton = '#next2';
    this.productName = 'h2.name';
    this.addToCartButton = 'a[onclick*="addToCart"]';
    this.homeLink = 'a.nav-link:has-text("Home")';
    // New locators for category filtering
    this.categoryLink = 'a.list-group-item'; // Locator for category links in the sidebar
    this.visibleProducts = '.card-title a';  // Locator for visible product titles (same as productGrid, reused for clarity)
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

  // New method to select a category
  async selectCategory(category) {
    const categoryLocator = this.page.locator(`${this.categoryLink}:has-text("${category}")`);
    await categoryLocator.click();
    await this.page.waitForTimeout(2000); // Wait for the page to update with filtered products
  }

  // New method to get visible products after filtering
  async getVisibleProducts() {
    await this.page.waitForSelector(this.visibleProducts, { timeout: 6000 });
    const products = await this.page.$$eval(this.visibleProducts, elements => 
      elements.map(element => element.textContent.trim())
    );
    return products;
  }
}

module.exports = { HomePage };