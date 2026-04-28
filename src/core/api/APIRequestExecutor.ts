// src/core/api/APIRequestExecutor.ts

import { RetryExecutor } from '../resilience/retry/RetryExecutor';
import { RateLimiter } from '../resilience/rateLimiter/RateLimiter';
import { APIResponse } from '@playwright/test';
import { logger } from '../logger/Logger';
import { TokenManager } from '../auth/token/TokenManager';

export class APIRequestExecutor {

  static async execute(
    fn: () => Promise<APIResponse>,
    options?: {
      retryOn401?: boolean;
      userEmail?: string;
    }
  ): Promise<APIResponse> {

    await RateLimiter.acquire();

    return RetryExecutor.execute(async () => {

      const response = await fn();

      const status = response.status();

      logger.info(`[RESPONSE] Status: ${status}`);

      // 🔥 Handle auth expiry automatically
      if (status === 401 && options?.retryOn401 && options.userEmail) {
        logger.warn(`[AUTH] Token expired. Refreshing for ${options.userEmail}`);

        // invalidate token
        TokenManager.invalidate(options.userEmail);

        // retry once
        return await fn();
      }

      return response;
    });
  }
}