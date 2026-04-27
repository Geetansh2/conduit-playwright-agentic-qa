import { AuthPage } from "./auth.page";

export class AuthFlow {
  private authPage: AuthPage;

  constructor(authPage: AuthPage) {
    this.authPage = authPage;
  }

  async login(email: string, password: string) {
    await this.authPage.navigateToLogin();
    await this.authPage.enterEmail(email);
    await this.authPage.enterPassword(password);
    await this.authPage.clickLogin();
  }
}