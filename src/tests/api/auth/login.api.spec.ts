import { test, expect } from "../base/BaseTest";
import { AuthApi } from "../../../domain/auth/auth.api";
import { loginScenarios } from "../../../data/test-data/auth/signin.scenarios";
import { allureMeta } from "../../../core/utils/AllureUtils";
import { AuthAgent } from "../../../agents/auth/authAgent";

test("API: Login with valid user", async ({ apiClient, allure }) => {

  await allureMeta(
    allure,
    "API",
    "AUTH",
    "Login",
    "Valid User Login",
    "CRITICAL"
  );

  const authAgent = new AuthAgent(apiClient);
  const { email, password } = loginScenarios.validUser;
  const user = await authAgent.loginAndGetUser(email, password);
  expect(user.email).toBe(email);
  expect(user.token).toBeTruthy();
});


test("API: Login should fail with invalid credentials", async ({ apiClient, allure }) => {

  await allureMeta(
    allure,
    "API",
    "AUTH",
    "Login",
    "Invalid Credentials",
    "CRITICAL"
  );

  const authAgent = new AuthAgent(apiClient);
  const { email, password } = loginScenarios.invalidUser;
  const response = await authAgent.login(email, password);
  expect(response.status()).toBe(422);
  const body = await response.json();
  expect(body.errors).toBeDefined();
  expect(body.errors["email or password"]).toBe("is invalid");

});