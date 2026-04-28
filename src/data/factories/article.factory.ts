export class ArticleFactory {

  static validArticle(overrides: Partial<any> = {}) {
    return {
      title: `API Automation ${Date.now()}`,
      description: "End-to-end API validation",
      body: "This article is about Playwright API automation",
      tagList: [],
      ...overrides
    };
  }

  static invalidArticle() {
    return {
      // missing title
      description: "Invalid article",
      body: "Missing required fields"
    };
  }
}