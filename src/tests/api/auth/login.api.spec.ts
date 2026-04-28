import { test, expect } from "../base/BaseTest";
import { AuthApi } from "../../../domain/auth/auth.api";
import { loginScenarios } from "../../../data/test-data/auth/signin.scenarios";
import { allureMeta } from "../../../core/utils/AllureUtils";

test("API: Login with valid user", async ({ apiClient, allure }) => {

  await allureMeta(
    allure,
    "API",
    "AUTH",
    "Login",
    "Valid User Login",
    "CRITICAL"
  );

  const authApi = new AuthApi(apiClient);

  const { email, password } = loginScenarios.validUser;

  const user = await authApi.loginAndGetUser(email, password);
  
  
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

  const authApi = new AuthApi(apiClient);

  const { email, password } = loginScenarios.invalidUser;

  const response = await authApi.login(email, password);

  expect(response.status()).toBe(422);

  const body = await response.json();

  expect(body.errors).toBeDefined();
  expect(body.errors["email or password"]).toBe("is invalid");

});