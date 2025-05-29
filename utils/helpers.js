class Helpers {
  static async waitForPageLoad(page, selector, timeout = 5000) {
    await page.waitForSelector(selector, { timeout });
  }
}

module.exports = { Helpers };