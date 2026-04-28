// src/core/api/APIClient.ts

import { APIRequestContext, APIResponse } from '@playwright/test';
import { AuthStrategy } from '../auth/strategies/AuthStrategy';
import { APIRequestExecutor } from './APIRequestExecutor';
import { logger } from '../logger/Logger';
import { ConfigManager } from '../config/ConfigManager';

export class APIClient {

  private baseUrl: string;

  constructor(
    private request: APIRequestContext,
    private authStrategy?: AuthStrategy
  ) {
    this.baseUrl = ConfigManager.get('apiUrl');
  }

  private async buildHeaders(
  extraHeaders: Record<string, string> = {},
  authStrategy?: AuthStrategy
): Promise<Record<string, string>> {

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders
    };

    // 🔥 Priority: request-level > client-level
    const strategy = authStrategy || this.authStrategy;

    if (strategy) {
      await strategy.apply(headers);
    }

    return headers;
  }
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

  private async requestWrapper(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  options?: { authStrategy?: AuthStrategy }
): Promise<APIResponse> {

  const fullUrl = this.baseUrl + url;

  const headers = await this.buildHeaders(
    {},
    options?.authStrategy // 🔥 pass override here
  );

  logger.info(`[API] ${method} ${fullUrl}`);

  if (data) {
    logger.info(`[BODY] ${JSON.stringify(data)}`);
  }

  const curl = this.generateCurl(method, fullUrl, headers, data);
  logger.info(`[CURL]\n${curl}`);

  return APIRequestExecutor.execute(() => {
    switch (method) {
      case 'GET':
        return this.request.get(fullUrl, { headers });

      case 'POST':
        return this.request.post(fullUrl, { data, headers });

      case 'PUT':
        return this.request.put(fullUrl, { data, headers });

      case 'DELETE':
        return this.request.delete(fullUrl, { headers });

      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  });
  }

  async get(url: string, options?: { authStrategy?: AuthStrategy }) {
  return this.requestWrapper('GET', url, undefined, options);
}

async post(url: string, data: any, options?: { authStrategy?: AuthStrategy }) {
  return this.requestWrapper('POST', url, data, options);
}

async put(url: string, data: any, options?: { authStrategy?: AuthStrategy }) {
  return this.requestWrapper('PUT', url, data, options);
}

async delete(url: string, options?: { authStrategy?: AuthStrategy }) {
  return this.requestWrapper('DELETE', url, undefined, options);
}
}