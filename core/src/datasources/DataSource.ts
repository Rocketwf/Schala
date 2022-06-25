import { Article } from '../models/articles/Article';
export interface DataSource {
    fetchAuthorIds(query: string): Promise<string[]>;

    fetchName(authorId: string): string;
    fetchHIndex(authorId: string): number;
    fetchAffiliations(authorId: string): string[];
    fetchCitation(authorId: string): number;

    fetchI10Index(authorId: string): number;
    fetchArticles(authorId: string): Article[];
    hasSelfCitation(article: Article, authorId: string): boolean;
}
