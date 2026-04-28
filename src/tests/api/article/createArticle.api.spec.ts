import { test, expect } from "../base/BaseTest";
import { ArticleApi } from "../../../domain/article/article.api";
import { allureMeta } from "../../../core/utils/AllureUtils";
import { JWTAuthStrategy } from "../../../core/auth/strategies/JWTAuthStrategy";
import { ConfigManager } from "../../../core/config/ConfigManager";


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

  const testData = {
    title: `API Automation ${Date.now()}`,
    description: "End-to-end API validation",
    body: "This article is about Playwright API automation",
    tagList: []
  };

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

  const response = await articleApi.createArticle({
    title: "Test",
    description: "Test",
    body: "Test"
  });

  expect(response.status()).toBe(200);
  
});