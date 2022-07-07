import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIBasicAuthor } from '../models/API';
import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';

export class SearchResultsService extends ProfileService {
    private dataSource: DataSource = new SemanticScholarSource();
    private apiBasicAuthors: APIBasicAuthor[];
    private basicProfiles: BasicProfile[] = new Array<BasicProfile>();
    async build(query: string): Promise<BasicProfile[]> {
        this.apiBasicAuthors = await this.dataSource.fetchSearchResults(query);

        for (const basicAuthors of this.apiBasicAuthors) {
            this.basicProfiles.push(
                new BasicProfile(
                    basicAuthors.authorId,
                    basicAuthors.name,
                    basicAuthors.affiliations,
                    +basicAuthors.citationCount,
                ),
            );
        }
        return this.basicProfiles;
    }
}
