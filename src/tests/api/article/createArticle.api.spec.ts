import { test, expect } from "../base/BaseTest";
import { ArticleApi } from "../../../domain/article/article.api";
import { allureMeta } from "../../../core/utils/AllureUtils";
import { JWTAuthStrategy } from "../../../core/auth/strategies/JWTAuthStrategy";
import { ArticleFactory } from "../../../data/factories/article.factory";

import { ConfigManager } from "../../../core/config/ConfigManager";
import { loginScenarios } from "../../../data/test-data/auth/signin.scenarios";


test("API: Create article successfully", async ({ apiClient, allure, request }) => {

  await allureMeta(
    allure,
    "API",
    "ARTICLE",
    "Create",
    "Create Article",
    "CRITICAL"
  );

  const authStrategy = new JWTAuthStrategy(request, {
    email: ConfigManager.get("user.email"),
    password: ConfigManager.get("user.password"),
  });

  const articleApi = new ArticleApi(apiClient, authStrategy);

  const testData = ArticleFactory.validArticle();
  const article = await articleApi.createAndGetArticle(testData);

  expect(article.title).toBe(testData.title);
  expect(article.description).toBe(testData.description);
  expect(article.body).toContain("Playwright");
  expect(article.slug).toBeTruthy();
  expect(article.author.username).toBeDefined();
});


test("API: Create article should fail without authentication", async ({ apiClient, allure }) => {

  await allureMeta(
    allure,
    "API",
    "ARTICLE",
    "Create",
    "Create Article Without Auth",
    "CRITICAL"
  );

  const articleApi = new ArticleApi(apiClient);
  const testData = ArticleFactory.validArticle();
  const response = await articleApi.createArticle(testData);

  expect(response.status()).toBe(401);
  
});


test("API: Create article should fail with invalid token", async ({ apiClient, allure, request }) => {

 await allureMeta(
    allure,
    "API",
    "ARTICLE",
    "Create",
    "Create Article With invalid Auth",
    "CRITICAL"
  );
 const authStrategy = new JWTAuthStrategy(request, {
    email: loginScenarios.validUser.email,
    password: loginScenarios.invalidUser.password,
  });
  const articleApi = new ArticleApi(apiClient, authStrategy);
  const testData = ArticleFactory.validArticle();

  const response = await articleApi.createArticle(testData);
  expect(response.status()).toBe(422);
});

test("API: Create article should fail with invalid body", async ({ apiClient, allure, request }) => {

 await allureMeta(
    allure,
    "API",
    "ARTICLE",
    "Create",
    "Create Article With invalid body",
    "CRITICAL"
  );
 const authStrategy = new JWTAuthStrategy(request, {
    email: loginScenarios.validUser.email,
    password: loginScenarios.validUser.password,
  });
  const articleApi = new ArticleApi(apiClient, authStrategy);
  const testData = ArticleFactory.invalidArticle();

  const response = await articleApi.createArticle(testData);
  expect(response.status()).toBe(500);
});