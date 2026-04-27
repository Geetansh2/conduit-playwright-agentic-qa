import { test, expect } from "../base/BaseTest";
import { AuthApi } from "../../../domain/auth/auth.api";
import { jsonSchemaValidator } from "../../../core/validators/JSONSchemaValidator";
import loginResponseSchema from '../../../resources/schema/user.schema.json';
import { loginScenarios } from "../../../data/test-data/auth/signin.scenarios";
import { allureMeta } from "../../../core/utils/AllureUtils";

test("Login API valid user", async ({apiClient, allure}) => {
  await allureMeta(allure, "API", "LOGIN", "Authentication", "User Login - Invalid Creds", "CRITICAL");

  const authApi = new AuthApi(apiClient);
  const response = await authApi.login(loginScenarios.validUser.email,
    loginScenarios.validUser.password
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  jsonSchemaValidator.validate(loginResponseSchema, body);
});