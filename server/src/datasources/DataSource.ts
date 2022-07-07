import { APIBasicAuthor, APIPaper, APIAuthor } from '../models/API';
export interface DataSource {
    fetchSearchResults(query: string): Promise<APIBasicAuthor[]>;
    fetchAuthor(authorId: string): Promise<APIAuthor>;
    fetchPapers(paperIds: string[]): Promise<APIPaper[]>;
}
