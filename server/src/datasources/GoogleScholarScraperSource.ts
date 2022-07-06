import { DataSource } from './DataSource';
import { APIPaper, APIAuthor, APIBasicAuthor } from '../models/API';
export class GoogleScholarScraperSource implements DataSource {
    private static instance: GoogleScholarScraperSource;

    public static getInstance(): GoogleScholarScraperSource {
        if (!GoogleScholarScraperSource.instance) {
            GoogleScholarScraperSource.instance = new GoogleScholarScraperSource();
        }
        return GoogleScholarScraperSource.instance;
    }

    public async fetchSearchResults(authorId: string): Promise<APIBasicAuthor[]> {
        authorId;
        return;
    }
    public async fetchAuthor(authorId: string): Promise<APIAuthor> {
        authorId;
        return;
    }
    public async fetchPapers(paperIds: string[]): Promise<APIPaper[]> {
        paperIds;
        return;
    }
    public async fetchPictureURL(authorId: string): Promise<string> {
        authorId;
        return;
    }
}
