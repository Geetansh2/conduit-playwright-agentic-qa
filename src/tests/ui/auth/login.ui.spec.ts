import { test, expect } from "../base/BaseTest.spec";
import { AuthPage } from '../../../domain/auth/auth.page'
import { AuthFlow } from "../../../domain/auth/auth.flow";
import { ConfigManager } from "../../../core/config/ConfigManager";

test("User login UI with correct Creds", async ({ page, allure }) => {
    await allure.epic("LOGIN")
    await allure.addFeature("Authentication");
    await allure.addStory("User Login");
    await allure.setSeverity("CRITICAL");

  const authPage = new AuthPage(page);
  const authFlow = new AuthFlow(authPage);

  await allure.step("Perform login", async () => {
    await authFlow.login("geetanshbhatia12@gmail.com", "12345");
  });
  await expect(page).toHaveURL(ConfigManager.get("baseUrl"));
});

test("User login UI with wrong Creds", async ({ page, allure }) => {
    await allure.epic("LOGIN")
    await allure.addFeature("Authentication");
    await allure.addStory("User Login");
    await allure.setSeverity("CRITICAL");

  const authPage = new AuthPage(page);
  const authFlow = new AuthFlow(authPage);

  await allure.step("Perform login", async () => {
    await authFlow.login("test@test.com", "Password123");
  });

  await allure.step("Validate error message", async () => {
    const errorText = await authPage.getErrorMessage();
    await expect(errorText).toContain("email password is invalid");
  });

});

