class OrderPage {
  constructor(page) {
    this.page = page;
    this.orderModal = '#orderModal';
    this.nameField = '#name';
    this.countryField = '#country';
    this.cityField = '#city';
    this.cardField = '#card';
    this.monthField = '#month';
    this.yearField = '#year';
    this.purchaseButton = 'button[onclick="purchaseOrder()"]';
    this.confirmationModal = '.sweet-alert';
    this.confirmationMessage = '.sweet-alert h2';
    this.okButton = 'button.confirm:has-text("OK")';
  }

  async fillPurchaseDetails(details) {
    await this.page.waitForSelector(this.orderModal, { state: 'visible' });
    await this.page.fill(this.nameField, details.name);
    await this.page.fill(this.countryField, details.country);
    await this.page.fill(this.cityField, details.city);
    await this.page.fill(this.cardField, details.card);
    await this.page.fill(this.monthField, details.month);
    await this.page.fill(this.yearField, details.year);
  }

  async confirmPurchase() {
    await this.page.click(this.purchaseButton);
    await this.page.waitForSelector(this.confirmationModal, { state: 'visible' });
    await this.page.click(this.okButton);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }
}

module.exports = { OrderPage };