import { ArticleFactory } from '../data/factories/article.factory';

export class DataAgent {
  static getArticle(type: 'valid' | 'invalid' = 'valid') {
    if (type === 'valid') {
      return ArticleFactory.validArticle();
    }

    return {
      title: '',
      description: 'Invalid',
      body: '',
    };
  }
}
