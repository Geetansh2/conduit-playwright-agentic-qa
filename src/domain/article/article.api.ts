import { AuthStrategy } from "../../core/auth/strategies/AuthStrategy";
import { APIClient } from "../../core/api/APIClient";
import { Endpoints } from "../../endpoints/endpoints";

export interface ArticleResponse {
  article: {
    title: string;
    description: string;
    body: string;
    slug: string;
    author: {
      username: string;
    };
  };
}

export class ArticleApi {

  constructor(private apiClient: APIClient, private authStrategy?: AuthStrategy) {}

 async createArticle(data: any) {
    return this.apiClient.post(
      Endpoints.article.create,
      { article: data },
      { authStrategy: this.authStrategy } 
    );
  }

  async createAndGetArticle(data: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  }): Promise<ArticleResponse["article"]> {

    const response = await this.createArticle(data);

    if (response.status() !== 200) {
      throw new Error(`Article creation failed: ${response.status()}`);
    }

    const body: ArticleResponse = await response.json();

    return body.article;
  }
}