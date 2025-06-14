class BaseTest {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    console.log(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'load' });
  }
}

module.exports = { BaseTest };