import { AuthApi } from '../../domain/auth/auth.api';
import { APIClient } from '../../core/api/APIClient';


export class AuthAgent {

 private api: AuthApi;

  constructor(client: APIClient) {
    this.api = new AuthApi(client);
  }
  
}