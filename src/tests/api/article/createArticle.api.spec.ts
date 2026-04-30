import { test, expect } from '../base/BaseTest';
import { allureMeta } from '../../../core/utils/AllureUtils';
import { ArticleFactory } from '../../../data/factories/article.factory';
import { ArticleAgent } from '../../../agents/article/articleAgent';
import { AuthMode } from '../../../domain/auth/authEnum';

test('API: Create article successfully', async ({
  apiClient,
  allure,
  request,
  }) => {
    test.info().annotations.push({ type: 'tag', description: 'regression' });
  await allureMeta(
    allure,
    'API',
    'ARTICLE',
    'Create',
    'Create Article',
    'CRITICAL',
  );

  const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
  const testData = ArticleFactory.validArticle();
  const article = await articleAgent.createAndGetValidArticle(testData);

  expect(article.title).toBe(testData.title);
  expect(article.description).toBe(testData.description);
  expect(article.body).toContain('Playwright');
  expect(article.author.username).toBeDefined();
});


test('API: Create article should fail without authentication', async ({
  apiClient,
  allure,
  request
}) => {

  await allureMeta(
    allure,
    'API',
    'ARTICLE',
    'Create',
    'Create Article Without Auth',
    'CRITICAL',
  );

  
  const articleAgent = new ArticleAgent(apiClient, request, AuthMode.NONE);
  const testData = ArticleFactory.validArticle();
  const response = await articleAgent.createArticle(testData);
  expect(response.status()).toBe(401);
  
});

test('API: Create article should fail with invalid token', async ({
  apiClient,
  allure,
  request,
}) => {
  await allureMeta(
    allure,
    'API',
    'ARTICLE',
    'Create',
    'Create Article With invalid Auth',
    'CRITICAL',
  );
const articleAgent = new ArticleAgent(apiClient, request, AuthMode.INVALID);
const testData = ArticleFactory.validArticle();
const response = await articleAgent.createArticle(testData);
expect(response.status()).toBe(401);

});

test('API: Create article should fail with invalid body', async ({
  apiClient,
  allure,
  request,
}) => {
  await allureMeta(
    allure,
    'API',
    'ARTICLE',
    'Create',
    'Create Article With invalid body',
    'CRITICAL',
  );
 const articleAgent = new ArticleAgent(apiClient, request, AuthMode.VALID);
 const testData = ArticleFactory.invalidArticle();
 const response = await articleAgent.createArticle(testData);
  expect(response.status()).toBe(500);
});
