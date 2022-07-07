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

        for (const basicAuthor of this.apiBasicAuthors) {
            let name: string = basicAuthor.name;
            if (basicAuthor.aliases) name = basicAuthor.aliases[basicAuthor.aliases.length - 1];
            this.basicProfiles.push(
                new BasicProfile(basicAuthor.authorId, name, basicAuthor.affiliations, +basicAuthor.citationCount),
            );
        }
        return this.basicProfiles;
    }
}
