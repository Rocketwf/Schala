import { Article } from '../models/articles/Article';
import { FullProfile } from '../models/profile';

export interface DataSource {
    fetchAuthorIds(query: string): Promise<string[]>;

    fetchName(authorId: string): Promise<string>;
    fetchHIndex(authorId: string): Promise<number>;
    fetchAffiliations(authorId: string): Promise<string[]>;
    fetchCitation(authorId: string): Promise<number>;

    fetchI10Index(authorId: string): Promise<number>;
    fetchArticles(authorId: string, fullProfile?: FullProfile): Promise<Article[]>;
    fetchWebsite(authorId: string): Promise<string>;
}
