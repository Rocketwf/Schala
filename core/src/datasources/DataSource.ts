import { Article } from '../models/articles/Article';
export interface DataSource {
    fetchAuthorIds(query: string): Promise<string[]>;

    fetchName(authorId: string): Promise<string>;
    fetchHIndex(authorId: string): Promise<number>;
    fetchAffiliations(authorId: string): Promise<string[]>;
    fetchCitation(authorId: string): Promise<string>;

    fetchI10Index(authorId: string): Promise<number>;
    fetchArticles(authorId: string): Promise<Article[]>;
    hasSelfCitation(article: Article, authorId: string): Promise<boolean>;
}
