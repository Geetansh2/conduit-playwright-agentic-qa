import { AuthStrategy } from './AuthStrategy';

export class NoAuthStrategy implements AuthStrategy {
  async apply(_: Record<string, string>): Promise<void> {
    // no auth
  }
}