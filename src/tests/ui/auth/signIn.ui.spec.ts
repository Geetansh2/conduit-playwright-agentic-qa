import { test, expect } from "../base/BaseTest";
import { AuthPage } from '../../../domain/auth/auth.page'
import { AuthFlow } from "../../../domain/auth/auth.flow";
import { ConfigManager } from "../../../core/config/ConfigManager";
import { loginScenarios } from '../../../data/test-data/auth/signin.scenarios'
import { allureMeta } from "../../../core/utils/AllureUtils";



test("User login UI with correct Creds @regression @ui", async ({ page, allure }) => {
  await allureMeta(allure,"UI", "LOGIN", "Authentication", "User Login - Valid Creds", "CRITICAL");

  const authPage = new AuthPage(page);
  const authFlow = new AuthFlow(authPage);

  await allure.step("Perform login", async () => {
    await authFlow.login(loginScenarios.validUser.email, loginScenarios.validUser.password);
  });
  await expect(page).toHaveURL(ConfigManager.get("baseUrl"));
});

test("User login UI with wrong Creds @regression @ui", async ({ page, allure }) => {
  await allureMeta(allure, "UI", "LOGIN", "Authentication", "User Login - Invalid Creds", "CRITICAL");

  const authPage = new AuthPage(page);
  const authFlow = new AuthFlow(authPage);

  await allure.step("Perform login", async () => {
    await authFlow.login(loginScenarios.invalidUser.email, loginScenarios.invalidUser.password);
  });

  await allure.step("Validate error message", async () => {
    const errorText = await authPage.getErrorMessage();
    await expect(errorText).toContain(loginScenarios.invalidUser.expectedError);
  });

});

