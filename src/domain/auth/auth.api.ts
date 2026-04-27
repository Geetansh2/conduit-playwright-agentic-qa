import { APIClient } from "../../core/api/APIClient";
import { Endpoints } from "../../endpoints/endpoints";

export class AuthApi {
  constructor(private apiClient: APIClient) {}

  async login(email: string, password: string) {
    return this.apiClient.post(Endpoints.auth.login, {
      user: {
        email,
        password,
      },
    });
  }
}