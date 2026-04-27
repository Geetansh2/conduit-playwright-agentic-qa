// src/core/auth/strategies/AuthStrategy.ts

export interface AuthStrategy {
  apply(headers: Record<string, string>): Promise<void>;
}