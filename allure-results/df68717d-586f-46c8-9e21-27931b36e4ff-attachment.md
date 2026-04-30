# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:66:5

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
  10  | import { AuthMode } from '../../../domain/auth/authEnum';
  11  | 
  12  | test('API: Create article successfully', async ({
  13  |   apiClient,
  14  |   allure,
  15  |   request,
  16  |   }) => {
  17  |     test.info().annotations.push({ type: 'tag', description: 'regression' });
  18  |   await allureMeta(
  19  |     allure,
  20  |     'API',
  21  |     'ARTICLE',
  22  |     'Create',
  23  |     'Create Article',
  24  |     'CRITICAL',
  25  |   );
  26  | 
  27  |   // const authStrategy = new JWTAuthStrategy(request, {
  28  |   //   email: ConfigManager.get('user.email'),
  29  |   //   password: ConfigManager.get('user.password'),
  30  |   // });
  31  | 
  32  |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  33  |   const testData = ArticleFactory.validArticle();
  34  |   const article = await articleAgent.createAndGetValidArticle(testData);
  35  | 
  36  |   expect(article.title).toBe(testData.title);
  37  |   expect(article.description).toBe(testData.description);
  38  |   expect(article.body).toContain('Playwright');
  39  |   expect(article.author.username).toBeDefined();
  40  | });
  41  | 
  42  | 
  43  | test('API: Create article should fail without authentication', async ({
  44  |   apiClient,
  45  |   allure,
  46  |   request
  47  | }) => {
  48  | 
  49  |   await allureMeta(
  50  |     allure,
  51  |     'API',
  52  |     'ARTICLE',
  53  |     'Create',
  54  |     'Create Article Without Auth',
  55  |     'CRITICAL',
  56  |   );
  57  | 
  58  |   
  59  |   const articleAgent = new ArticleAgent(apiClient, request, AuthMode.NONE);
  60  |   const testData = ArticleFactory.validArticle();
  61  |   const response = await articleAgent.createArticle(testData);
  62  |   expect(response.status()).toBe(401);
  63  |   
  64  | });
  65  | 
  66  | test('API: Create article should fail with invalid token', async ({
  67  |   apiClient,
  68  |   allure,
  69  |   request,
  70  | }) => {
  71  |   await allureMeta(
  72  |     allure,
  73  |     'API',
  74  |     'ARTICLE',
  75  |     'Create',
  76  |     'Create Article With invalid Auth',
  77  |     'CRITICAL',
  78  |   );
  79  |   const authStrategy = new JWTAuthStrategy(request, {
  80  |     email: loginScenarios.validUser.email,
  81  |     password: loginScenarios.invalidUser.password,
  82  |   });
  83  | 
  84  | const articleAgent = new ArticleAgent(apiClient, request, AuthMode.INVALID);
  85  | const testData = ArticleFactory.validArticle();
  86  | const response = await articleAgent.createArticle(testData);
> 87  | expect(response.status()).toBe(422);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  88  | 
  89  | });
  90  | 
  91  | test('API: Create article should fail with invalid body', async ({
  92  |   apiClient,
  93  |   allure,
  94  |   request,
  95  | }) => {
  96  |   await allureMeta(
  97  |     allure,
  98  |     'API',
  99  |     'ARTICLE',
  100 |     'Create',
  101 |     'Create Article With invalid body',
  102 |     'CRITICAL',
  103 |   );
  104 |   const authStrategy = new JWTAuthStrategy(request, {
  105 |     email: loginScenarios.validUser.email,
  106 |     password: loginScenarios.validUser.password,
  107 |   });
  108 |  const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  109 |   const testData = ArticleFactory.invalidArticle();
  110 | 
  111 |   const response = await articleAgent.createArticle(testData);
  112 |   expect(response.status()).toBe(500);
  113 | });
  114 | 
```