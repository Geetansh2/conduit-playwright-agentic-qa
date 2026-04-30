# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:61:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 422
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from '../base/BaseTest';
  2  | import { ArticleApi } from '../../../domain/article/article.api';
  3  | import { allureMeta } from '../../../core/utils/AllureUtils';
  4  | import { JWTAuthStrategy } from '../../../core/auth/strategies/JWTAuthStrategy';
  5  | import { ArticleFactory } from '../../../data/factories/article.factory';
  6  | 
  7  | import { ConfigManager } from '../../../core/config/ConfigManager';
  8  | import { loginScenarios } from '../../../data/test-data/auth/signin.scenarios';
  9  | import { ArticleAgent } from '../../../agents/article/articleAgent';
  10 | import { AuthMode } from '../../../domain/auth/authEnum';
  11 | 
  12 | test('API: Create article successfully', async ({
  13 |   apiClient,
  14 |   allure,
  15 |   request,
  16 |   }) => {
  17 |     test.info().annotations.push({ type: 'tag', description: 'regression' });
  18 |   await allureMeta(
  19 |     allure,
  20 |     'API',
  21 |     'ARTICLE',
  22 |     'Create',
  23 |     'Create Article',
  24 |     'CRITICAL',
  25 |   );
  26 | 
  27 |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  28 |   const testData = ArticleFactory.validArticle();
  29 |   const article = await articleAgent.createAndGetValidArticle(testData);
  30 | 
  31 |   expect(article.title).toBe(testData.title);
  32 |   expect(article.description).toBe(testData.description);
  33 |   expect(article.body).toContain('Playwright');
  34 |   expect(article.author.username).toBeDefined();
  35 | });
  36 | 
  37 | 
  38 | test('API: Create article should fail without authentication', async ({
  39 |   apiClient,
  40 |   allure,
  41 |   request
  42 | }) => {
  43 | 
  44 |   await allureMeta(
  45 |     allure,
  46 |     'API',
  47 |     'ARTICLE',
  48 |     'Create',
  49 |     'Create Article Without Auth',
  50 |     'CRITICAL',
  51 |   );
  52 | 
  53 |   
  54 |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.NONE);
  55 |   const testData = ArticleFactory.validArticle();
  56 |   const response = await articleAgent.createArticle(testData);
  57 |   expect(response.status()).toBe(401);
  58 |   
  59 | });
  60 | 
  61 | test('API: Create article should fail with invalid token', async ({
  62 |   apiClient,
  63 |   allure,
  64 |   request,
  65 | }) => {
  66 |   await allureMeta(
  67 |     allure,
  68 |     'API',
  69 |     'ARTICLE',
  70 |     'Create',
  71 |     'Create Article With invalid Auth',
  72 |     'CRITICAL',
  73 |   );
  74 | const articleAgent = new ArticleAgent(apiClient, request, AuthMode.INVALID);
  75 | const testData = ArticleFactory.validArticle();
  76 | const response = await articleAgent.createArticle(testData);
> 77 | expect(response.status()).toBe(422);
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  78 | 
  79 | });
  80 | 
  81 | test('API: Create article should fail with invalid body', async ({
  82 |   apiClient,
  83 |   allure,
  84 |   request,
  85 | }) => {
  86 |   await allureMeta(
  87 |     allure,
  88 |     'API',
  89 |     'ARTICLE',
  90 |     'Create',
  91 |     'Create Article With invalid body',
  92 |     'CRITICAL',
  93 |   );
  94 |  const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  95 |  const testData = ArticleFactory.invalidArticle();
  96 |  const response = await articleAgent.createArticle(testData);
  97 |   expect(response.status()).toBe(500);
  98 | });
  99 | 
```