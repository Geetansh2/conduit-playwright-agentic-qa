// src/core/api/APIClient.ts

import { APIRequestContext } from '@playwright/test';
import { AuthStrategy } from '../auth/strategies/AuthStrategy';
import { APIRequestExecutor } from './APIRequestExecutor';

export class APIClient {

  constructor(
    private request: APIRequestContext,
    private authStrategy?: AuthStrategy
  ) {}

  async get(url: string) {
    const headers: Record<string, string> = {};

    if (this.authStrategy) {
      await this.authStrategy.apply(headers);
    }

    return APIRequestExecutor.execute(() =>
      this.request.get(url, { headers })
    );
  }

  async post(url: string, data: any) {
    const headers: Record<string, string> = {};

    if (this.authStrategy) {
      await this.authStrategy.apply(headers);
    }

    return APIRequestExecutor.execute(() =>
      this.request.post(url, { data, headers })
    );
  }
}