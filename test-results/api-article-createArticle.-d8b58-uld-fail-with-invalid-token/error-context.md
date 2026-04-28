# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:62:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 422
Received: 200
```

# Test source

```ts
  1   | import { test, expect } from '../base/BaseTest';
  2   | import { ArticleApi } from '../../../domain/article/article.api';
  3   | import { allureMeta } from '../../../core/utils/AllureUtils';
  4   | import { JWTAuthStrategy } from '../../../core/auth/strategies/JWTAuthStrategy';
  5   | import { ArticleFactory } from '../../../data/factories/article.factory';
  6   | 
  7   | import { ConfigManager } from '../../../core/config/ConfigManager';
  8   | import { loginScenarios } from '../../../data/test-data/auth/signin.scenarios';
  9   | import { ArticleAgent } from '../../../agents/article/articleAgent';
  10  | 
  11  | test('API: Create article successfully', async ({
  12  |   apiClient,
  13  |   allure,
  14  |   request,
  15  | }) => {
  16  |   await allureMeta(
  17  |     allure,
  18  |     'API',
  19  |     'ARTICLE',
  20  |     'Create',
  21  |     'Create Article',
  22  |     'CRITICAL',
  23  |   );
  24  | 
  25  |   const authStrategy = new JWTAuthStrategy(request, {
  26  |     email: ConfigManager.get('user.email'),
  27  |     password: ConfigManager.get('user.password'),
  28  |   });
  29  | 
  30  |   const articleAgent = new ArticleAgent(apiClient, authStrategy);
  31  |   const testData = ArticleFactory.validArticle();
  32  |   const article = await articleAgent.createAndGetValidArticle(testData);
  33  | 
  34  |   expect(article.title).toBe(testData.title);
  35  |   expect(article.description).toBe(testData.description);
  36  |   expect(article.body).toContain('Playwright');
  37  |   expect(article.author.username).toBeDefined();
  38  | });
  39  | 
  40  | 
  41  | test('API: Create article should fail without authentication', async ({
  42  |   apiClient,
  43  |   allure,
  44  | }) => {
  45  |   await allureMeta(
  46  |     allure,
  47  |     'API',
  48  |     'ARTICLE',
  49  |     'Create',
  50  |     'Create Article Without Auth',
  51  |     'CRITICAL',
  52  |   );
  53  | 
  54  |   
  55  |   const articleAgent = new ArticleAgent(apiClient);
  56  |   const testData = ArticleFactory.validArticle();
  57  |   const response = await articleAgent.createArticle(testData);
  58  |   expect(response.status()).toBe(401);
  59  |   
  60  | });
  61  | 
  62  | test('API: Create article should fail with invalid token', async ({
  63  |   apiClient,
  64  |   allure,
  65  |   request,
  66  | }) => {
  67  |   await allureMeta(
  68  |     allure,
  69  |     'API',
  70  |     'ARTICLE',
  71  |     'Create',
  72  |     'Create Article With invalid Auth',
  73  |     'CRITICAL',
  74  |   );
  75  |   const authStrategy = new JWTAuthStrategy(request, {
  76  |     email: loginScenarios.validUser.email,
  77  |     password: loginScenarios.invalidUser.password,
  78  |   });
  79  | 
  80  | const articleAgent = new ArticleAgent(apiClient, authStrategy);
  81  | const testData = ArticleFactory.validArticle();
  82  | const response = await articleAgent.createArticle(testData);
> 83  | expect(response.status()).toBe(422);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  84  | 
  85  | });
  86  | 
  87  | test('API: Create article should fail with invalid body', async ({
  88  |   apiClient,
  89  |   allure,
  90  |   request,
  91  | }) => {
  92  |   await allureMeta(
  93  |     allure,
  94  |     'API',
  95  |     'ARTICLE',
  96  |     'Create',
  97  |     'Create Article With invalid body',
  98  |     'CRITICAL',
  99  |   );
  100 |   const authStrategy = new JWTAuthStrategy(request, {
  101 |     email: loginScenarios.validUser.email,
  102 |     password: loginScenarios.validUser.password,
  103 |   });
  104 |  const articleAgent = new ArticleAgent(apiClient, authStrategy);
  105 |   const testData = ArticleFactory.invalidArticle();
  106 | 
  107 |   const response = await articleAgent.createArticle(testData);
  108 |   expect(response.status()).toBe(500);
  109 | });
  110 | 
```