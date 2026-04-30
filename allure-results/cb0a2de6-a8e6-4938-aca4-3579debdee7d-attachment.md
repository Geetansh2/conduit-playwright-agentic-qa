# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:61:5

# Error details

```
Error: Token refresh failed: 422
```

# Test source

```ts
  1  | // src/core/auth/token/TokenRefresher.ts
  2  | 
  3  | import { APIRequestContext } from '@playwright/test';
  4  | import { TokenInfo } from './TokenInfo';
  5  | import { Endpoints } from '../../../endpoints/endpoints';
  6  | import { ConfigManager } from '../../config/ConfigManager';
  7  | 
  8  | export class TokenRefresher {
  9  | 
  10 |   static async refresh(
  11 |     request: APIRequestContext,
  12 |     email: string,
  13 |     password: string
  14 |   ): Promise<TokenInfo> {
  15 |     const baseUrl = ConfigManager.get("apiUrl");
  16 | 
  17 |     // We can add retry using RetryExecutor.
  18 |     const response = await request.post(baseUrl+Endpoints.auth.login, {
  19 |       data: {
  20 |         user: {
  21 |           email,
  22 |           password
  23 |         }
  24 |       }
  25 |     });
  26 | 
  27 |     if (response.status() !== 200) {
> 28 |       throw new Error(`Token refresh failed: ${response.status()}`);
     |             ^ Error: Token refresh failed: 422
  29 |     }
  30 | 
  31 |     const body = await response.json();
  32 | 
  33 |     return {
  34 |       token: body.user.token,
  35 |       expiry: Date.now() + 60 * 60 * 1000 // 1 hour
  36 |     };
  37 |   }
  38 | }
```