import { DataSource } from './DataSource';
import { APIPaper, APIAuthor, APIBasicAuthor } from '../models/API';
export class SemanticScholarSource implements DataSource {
    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    public async fetchSearchResults(authorId: string): Promise<APIBasicAuthor[]> {
        authorId;
        return;
    }
    public async fetchAuthor(authorId: string): Promise<APIAuthor> {
        authorId;
        return;
    }
    public async fetchPapers(authorId: string): Promise<APIPaper[]> {
        authorId;
        return;
    }
    public async fetchPictureURL(authorId: string): Promise<string> {
        authorId;
        return;
    }
}
