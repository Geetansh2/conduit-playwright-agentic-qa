// src/core/auth/token/TokenInfo.ts

export interface TokenInfo {
  token: string;
  expiry: number; // epoch ms
}