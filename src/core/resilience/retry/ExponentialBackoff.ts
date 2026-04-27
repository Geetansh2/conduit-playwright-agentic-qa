export class ExponentialBackoff {
  static async wait(attempt: number) {
    const delay = Math.pow(2, attempt) * 100;
    return new Promise(res => setTimeout(res, delay));
  }
}