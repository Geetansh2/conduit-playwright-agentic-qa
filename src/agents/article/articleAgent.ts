import { ArticleApi } from '../../domain/article/article.api';
import { APIClient } from '../../core/api/APIClient';
import { AuthMode } from '../../domain/auth/authEnum'; 
import { APIRequestContext } from '@playwright/test';
import { AuthHelper } from '../../domain/auth/AuthHelper';



export class ArticleAgent {
  private api: ArticleApi;

  constructor(client: APIClient, request: APIRequestContext,  authMode: AuthMode) {
    const authStrategy = this.getAuthStrategy(request, authMode)
     this.api = new ArticleApi(client, authStrategy);
  }
   
  getAuthStrategy(request: APIRequestContext, authMode: AuthMode){
    let authStrategy = undefined;
    switch (authMode){
      case AuthMode.VALID: 
        authStrategy = AuthHelper.validUser(request);
        break;
      case AuthMode.INVALID:
        authStrategy = AuthHelper.invalidUser(request);
        break;
      case AuthMode.NONE:
        authStrategy = undefined
    }
    return authStrategy
  }

  async createArticle(data: any){
    return this.api.createArticle(data)
  }

  async createAndGetValidArticle(data: any) {
    return this.api.createAndGetArticle(data);
  }

}
