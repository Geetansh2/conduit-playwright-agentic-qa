// src/core/auth/token/TokenManager.ts

import { APIRequestContext } from '@playwright/test';
import { TokenCache } from './TokenCache';
import { TokenRefresher } from './TokenRefresher';

export class TokenManager {

  static async getToken(
    request: APIRequestContext,
    email: string,
    password: string
  ): Promise<string> {
    try{
      const cached = TokenCache.get(email);

      if (cached) {
        return cached.token;
      }

      // 👇 delegated to refresher
      const tokenInfo = await TokenRefresher.refresh(
        request,
        email,
        password
      );

      TokenCache.set(email, tokenInfo);

    return tokenInfo.token;
    }
    catch{
       throw new Error(`Token failed for user: ${email}`);
    }
  }

  static invalidate(email: string) {
    TokenCache.clear(email);
  }
}