// src/core/auth/token/TokenCache.ts

import { TokenInfo } from './TokenInfo';

export class TokenCache {
  private static cache: Map<string, TokenInfo> = new Map();

  static get(key: string): TokenInfo | null {
    const tokenInfo = this.cache.get(key);

    if (!tokenInfo) return null;

    // check expiry
    if (Date.now() > tokenInfo.expiry) {
      this.cache.delete(key);
      return null;
    }

    return tokenInfo;
  }

  static set(key: string, tokenInfo: TokenInfo) {
    this.cache.set(key, tokenInfo);
  }

  static clear(key: string) {
    this.cache.delete(key);
  }

  static clearAll() {
    this.cache.clear();
  }
}
