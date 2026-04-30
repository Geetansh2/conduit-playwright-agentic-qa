// src/core/auth/strategies/JWTAuthStrategy.ts

import { AuthStrategy } from './AuthStrategy';
import { APIRequestContext } from '@playwright/test';
import { TokenManager } from '../token/TokenManager';

export type AuthHeaderType = 'Token' | 'Bearer';

export interface UserContext {
  email: string;
  password: string;
}

export class JWTAuthStrategy implements AuthStrategy {

  constructor(
    private request: APIRequestContext,
    private user: UserContext,
    private type: AuthHeaderType = 'Token'
  ) {}

  async apply(headers: Record<string, string>): Promise<void> {
try{
    const token = await TokenManager.getToken(
      this.request,
      this.user.email,
      this.user.password
    );

    headers['Authorization'] = `${this.type} ${token}`;
  }catch{
    headers['Authorization'] =  `${this.type} {jahbfk}`;
  }
}
}