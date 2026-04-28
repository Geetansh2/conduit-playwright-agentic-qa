import { ArticleApi } from '../../domain/article/article.api';
import { APIClient } from '../../core/api/APIClient';
import { AuthStrategy } from '../../core/auth/strategies/AuthStrategy';

export class ArticleAgent {
  private api: ArticleApi;

  constructor(client: APIClient, auth?: AuthStrategy) {
    this.api = new ArticleApi(client, auth);
  }

  async createArticle(data: any){
    return this.api.createArticle(data)
  }

  async createAndGetValidArticle(data: any) {
    return this.api.createAndGetArticle(data);
  }



}
