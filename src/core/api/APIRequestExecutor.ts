import { RetryExecutor } from './../resilience/retry/RetryExecutor'
import { RateLimiter } from './../resilience/rateLimiter/RateLimiter';

export class APIRequestExecutor {
  static async execute(fn: () => Promise<any>) {
    await RateLimiter.acquire();

    return RetryExecutor.execute(fn);
  }
}