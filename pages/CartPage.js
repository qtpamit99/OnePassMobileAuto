class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = '#cartur';
    this.cartTable = '#tbodyid';
    this.placeOrderButton = 'button:has-text("Place Order")';
  }

  async navigateToCart() {
    await this.page.click(this.cartLink);
    await this.page.waitForSelector(this.cartTable);
  }

  async getCartItems() {
    return await this.page.$$eval(`${this.cartTable} tr`, rows =>
      rows.map(row => row.querySelector('td:nth-child(2)').textContent.trim())
    );
  }

  async proceedToPurchase() {
    await this.page.click(this.placeOrderButton);
  }
}

module.exports = { CartPage };