import { Article } from '../models/articles/Article'
export interface DataSource {
  fetchHIndex(authorId: string): Promise<number>
  fetchI10Index(authorId: string): Promise<number>
  hasSelfCitation(article: Article, authorId: string): Promise<boolean>
  fetchArticles(authorId: string): Promise<Article[]>
}
