const { ConfigLoader } = require('../utils/configLoader');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = '#login2';
    this.loginModal = '#logInModal';
    this.usernameField = '#loginusername';
    this.passwordField = '#loginpassword';
    this.loginButton = 'button[onclick="logIn()"]';
    this.welcomeText = '#nameofuser';
    this.logoutButton = '#logout2';
  }

  async login(username, password) {
    const config = ConfigLoader.getConfig();
    await this.page.click(this.loginLink);
    await this.page.waitForSelector(this.loginModal, { state: 'visible', timeout: config.timeout });
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.welcomeText, { state: 'visible', timeout: config.timeout });
  }

  async getWelcomeText() {
    return await this.page.textContent(this.welcomeText);
  }

  async isLogoutButtonVisible() {
    return await this.page.locator(this.logoutButton).isVisible();
  }
}

module.exports = { LoginPage };