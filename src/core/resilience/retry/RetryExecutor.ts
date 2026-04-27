import { ExponentialBackoff } from './ExponentialBackoff';

export class RetryExecutor {
  static async execute(fn: () => Promise<any>, retries = 3) {
    let attempt = 0;

    while (attempt < retries) {
      try {
        return await fn();
      } catch (err) {
        attempt++;
        if (attempt === retries) throw err;

        await ExponentialBackoff.wait(attempt);
      }
    }
  }
}