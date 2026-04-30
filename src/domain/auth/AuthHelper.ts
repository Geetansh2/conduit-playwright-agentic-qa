import { APIRequestContext } from "@playwright/test";
import { ConfigManager } from "../../core/config/ConfigManager";
import { JWTAuthStrategy } from "../../core/auth/strategies/JWTAuthStrategy";

export class AuthHelper {

  static validUser(request: APIRequestContext) {
    return new JWTAuthStrategy(request, {
      email: ConfigManager.get("user.email"),
      password: ConfigManager.get("user.password"),
    });
  }

  static invalidUser(request: APIRequestContext) {
    return new JWTAuthStrategy(request, {
      email: ConfigManager.get("user.email"),
      password: "wrong_password",
    });
  }
}