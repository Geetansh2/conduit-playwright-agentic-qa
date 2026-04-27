// src/core/auth/strategies/BearerTokenStrategy.ts

import { AuthStrategy } from './AuthStrategy';
import { TokenManager } from '../token/TokenManager';
import { APIRequestContext } from '@playwright/test';

export class BearerTokenStrategy implements AuthStrategy {

  constructor(
    private request: APIRequestContext,
    private email: string,
    private password: string
  ) {}

  async apply(headers: Record<string, string>) {

    const token = await TokenManager.getToken(
      this.request,
      this.email,
      this.password
    );

    headers['Authorization'] = `Token ${token}`;
  }
}