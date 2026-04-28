// src/core/auth/strategies/OAuthStrategy.ts

import { AuthStrategy } from './AuthStrategy';
import { APIRequestContext } from '@playwright/test';
import { TokenManager } from '../token/TokenManager';

//We can improve this. Just copied beaer token strategy
export class OAuthStrategy implements AuthStrategy {

  constructor(
    private request: APIRequestContext,
    private clientId: string,
    private clientSecret: string
  ) {}

  async apply(headers: Record<string, string>) {

   
  }
}