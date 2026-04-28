import { AuthApi } from '../../domain/auth/auth.api';
import { APIClient } from '../../core/api/APIClient';


export class AuthAgent {

 private api: AuthApi;

  constructor(client: APIClient) {
    this.api = new AuthApi(client);
  }

  async login(email: string, password: string){
    return this.api.login(email, password)
  }

  async loginAndGetUser(email: string, password: string) {
      return this.api.loginAndGetUser(email, password);
    }

}