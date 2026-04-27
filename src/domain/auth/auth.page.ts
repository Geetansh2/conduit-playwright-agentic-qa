import { BasePage } from "../../core/base/BasePage";
import { ConfigManager } from "../../core/config/ConfigManager";
import { logger } from "../../core/logger/Logger";

export class AuthPage extends BasePage {

  // 🔹 Selectors (centralized)
  private selectors = {
    emailInput: "input[placeholder='Email']",
    passwordInput: "input[placeholder='Password']",
    signInButton: "//button[normalize-space()='Sign in']",
    errorMessage: "ul[class='error-messages'] li",
  };

  async navigateToLogin() {
    await this.step("Navigate to Login Page", async () => {
      logger.info("BaseUrl: " + ConfigManager.get('baseUrl'));
      await this.page.goto(ConfigManager.get('baseUrl') + '/login');
    });
  }

  async enterEmail(email: string) {
    await this.step("Enter Email", async () => {
      await this.fill(this.selectors.emailInput, email);
    });
  }

  async enterPassword(password: string) {
    await this.step("Enter Password", async () => {
      await this.fill(this.selectors.passwordInput, password);
    });
  }

  async clickLogin() {
    await this.step("Click SignIn Button Button", async () => {
      await this.click(this.selectors.signInButton);
    });
  }

  async getErrorMessage() {
    return await this.step("Get Error Message", async () => {
      return await this.locator(this.selectors.errorMessage).textContent();
    });
  }
}