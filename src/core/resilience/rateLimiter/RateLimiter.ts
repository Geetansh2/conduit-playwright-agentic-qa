export class RateLimiter {
  private static lastCall = 0;
  private static interval = 200; // ms

  static async acquire() {
    const now = Date.now();
    const waitTime = this.interval - (now - this.lastCall);

    if (waitTime > 0) {
      await new Promise(res => setTimeout(res, waitTime));
    }

    this.lastCall = Date.now();
  }
}