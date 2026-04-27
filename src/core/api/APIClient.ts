// src/core/api/APIClient.ts

import { APIRequestContext } from '@playwright/test';
import { AuthStrategy } from '../auth/strategies/AuthStrategy';
import { APIRequestExecutor } from './APIRequestExecutor';
import { logger } from '../logger/Logger';
import { ConfigManager } from '../config/ConfigManager';

export class APIClient {

  constructor(
    private request: APIRequestContext,
    private authStrategy?: AuthStrategy
  ) {}

  private generateCurl(
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: any
): string {
  let curl = `curl -X ${method} '${url}'`;

  for (const [key, value] of Object.entries(headers)) {
    curl += ` \\\n  -H '${key}: ${value}'`;
  }

  if (body) {
    curl += ` \\\n  --data-raw '${JSON.stringify(body)}'`;
  }

  return curl;
}

  async get(url: string) {
    const headers: Record<string, string> = {};

    if (this.authStrategy) {
      await this.authStrategy.apply(headers);
    }

    return APIRequestExecutor.execute(() =>
      this.request.get(ConfigManager.get('apiUrl') + url, { headers })
    );
  }

  async post(url: string, data: any) {
     const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };



    if (this.authStrategy) {
      await this.authStrategy.apply(headers);
    }
    logger.info(ConfigManager.get('apiUrl')+ url);
    logger.info(JSON.stringify(data));
    const curl = this.generateCurl("POST", ConfigManager.get('apiUrl')+ url, headers, data);
    logger.info(curl);
    return APIRequestExecutor.execute(() =>
      this.request.post(ConfigManager.get('apiUrl') + url, { data, headers })
    );
  }
}