// src/domain/auth/auth.api.ts

import { APIClient } from "../../core/api/APIClient";
import { Endpoints } from "../../endpoints/endpoints";
import { jsonSchemaValidator } from "../../core/validators/JSONSchemaValidator";
import loginResponseSchema from "../../resources/schema/user.schema.json";

export interface LoginResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string | null;
    image: string | null;
  };
}

export class AuthApi {

  constructor(private apiClient: APIClient) {}

  // 🔹 Raw API (low-level)
  async login(email: string, password: string) {
    return this.apiClient.post(Endpoints.auth.login, {
      user: { email, password }
    });
  }

  // 🔥 High-level (recommended for tests)
  async loginAndGetUser(
    email: string,
    password: string
  ): Promise<LoginResponse["user"]> {

    const response = await this.login(email, password);

    if (response.status() !== 200) {
      throw new Error(`Login failed with status ${response.status()}`);
    }

    const body: LoginResponse = await response.json();

    // 🔹 Contract validation
    jsonSchemaValidator.validate(loginResponseSchema, body);

    return body.user;
  }
}