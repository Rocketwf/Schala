import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIBasicAuthor } from '../models/API';
import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';

export class SearchResultsService extends ProfileService {
    private dataSource: DataSource = new SemanticScholarSource();
    async build(query: string): Promise<BasicProfile[]> {
        const apiBasicAuthors: APIBasicAuthor[] = await this.dataSource.fetchSearchResults(query);
        const basicProfiles: BasicProfile[] = new Array<BasicProfile>();

        for (const basicAuthor of apiBasicAuthors) {
            let name: string = basicAuthor.name;

            if (basicAuthor.aliases) {
                name = basicAuthor.aliases[basicAuthor.aliases.length - 1];
            }

            basicProfiles.push(
                new BasicProfile(
                    basicAuthor.authorId,
                    name,
                    basicAuthor.affiliations,
                    +basicAuthor.citationCount,
                    +basicAuthor.paperCount,
                ),
            );
        }
        return basicProfiles;
    }
}
