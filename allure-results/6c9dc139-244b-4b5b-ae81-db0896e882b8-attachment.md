# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:56:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from '../base/BaseTest';
  2  | import { allureMeta } from '../../../core/utils/AllureUtils';
  3  | import { ArticleFactory } from '../../../data/factories/article.factory';
  4  | import { ArticleAgent } from '../../../agents/article/articleAgent';
  5  | import { AuthMode } from '../../../domain/auth/authEnum';
  6  | 
  7  | test('API: Create article successfully', async ({
  8  |   apiClient,
  9  |   allure,
  10 |   request,
  11 |   }) => {
  12 |     test.info().annotations.push({ type: 'tag', description: 'regression' });
  13 |   await allureMeta(
  14 |     allure,
  15 |     'API',
  16 |     'ARTICLE',
  17 |     'Create',
  18 |     'Create Article',
  19 |     'CRITICAL',
  20 |   );
  21 | 
  22 |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  23 |   const testData = ArticleFactory.validArticle();
  24 |   const article = await articleAgent.createAndGetValidArticle(testData);
  25 | 
  26 |   expect(article.title).toBe(testData.title);
  27 |   expect(article.description).toBe(testData.description);
  28 |   expect(article.body).toContain('Playwright');
  29 |   expect(article.author.username).toBeDefined();
  30 | });
  31 | 
  32 | 
  33 | test('API: Create article should fail without authentication', async ({
  34 |   apiClient,
  35 |   allure,
  36 |   request
  37 | }) => {
  38 | 
  39 |   await allureMeta(
  40 |     allure,
  41 |     'API',
  42 |     'ARTICLE',
  43 |     'Create',
  44 |     'Create Article Without Auth',
  45 |     'CRITICAL',
  46 |   );
  47 | 
  48 |   
  49 |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.NONE);
  50 |   const testData = ArticleFactory.validArticle();
  51 |   const response = await articleAgent.createArticle(testData);
  52 |   expect(response.status()).toBe(401);
  53 |   
  54 | });
  55 | 
  56 | test('API: Create article should fail with invalid token', async ({
  57 |   apiClient,
  58 |   allure,
  59 |   request,
  60 | }) => {
  61 |   await allureMeta(
  62 |     allure,
  63 |     'API',
  64 |     'ARTICLE',
  65 |     'Create',
  66 |     'Create Article With invalid Auth',
  67 |     'CRITICAL',
  68 |   );
  69 | const articleAgent = new ArticleAgent(apiClient, request, AuthMode.INVALID);
  70 | const testData = ArticleFactory.validArticle();
  71 | const response = await articleAgent.createArticle(testData);
> 72 | expect(response.status()).toBe(401);
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  73 | 
  74 | });
  75 | 
  76 | test('API: Create article should fail with invalid body', async ({
  77 |   apiClient,
  78 |   allure,
  79 |   request,
  80 | }) => {
  81 |   await allureMeta(
  82 |     allure,
  83 |     'API',
  84 |     'ARTICLE',
  85 |     'Create',
  86 |     'Create Article With invalid body',
  87 |     'CRITICAL',
  88 |   );
  89 |  const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  90 |  const testData = ArticleFactory.invalidArticle();
  91 |  const response = await articleAgent.createArticle(testData);
  92 |   expect(response.status()).toBe(500);
  93 | });
  94 | 
```