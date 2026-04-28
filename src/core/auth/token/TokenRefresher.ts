// src/core/auth/token/TokenRefresher.ts

import { APIRequestContext } from '@playwright/test';
import { TokenInfo } from './TokenInfo';
import { Endpoints } from '../../../endpoints/endpoints';
export class TokenRefresher {

  static async refresh(
    request: APIRequestContext,
    email: string,
    password: string
  ): Promise<TokenInfo> {

    // We can add retry using RetryExecutor.
    const response = await request.post(Endpoints.auth.login, {
      data: {
        user: {
          email,
          password
        }
      }
    });

    if (response.status() !== 200) {
      throw new Error(`Token refresh failed: ${response.status()}`);
    }

    const body = await response.json();

    return {
      token: body.user.token,
      expiry: Date.now() + 60 * 60 * 1000 // 1 hour
    };
  }
}