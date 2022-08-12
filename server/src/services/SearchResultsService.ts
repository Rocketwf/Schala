import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIBasicAuthor } from '../models/API';
import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';

/**
 * This class is responsible for building the search results for a given query
 */
export class SearchResultsService extends ProfileService 
{
    /**
     * The used data source for the query
     */
    private dataSource: DataSource = new SemanticScholarSource();
    /**
     * Builds the search results data for the given query
     * @param query - Query to build
     * @returns - The data of the built profiles
     */
    async build(query: string): Promise<BasicProfile[]> 
    {
        query = query.replace(/[^\x21-\xFF]/g, '');
        const apiBasicAuthors: APIBasicAuthor[] = await this.dataSource.fetchSearchResults(query);
        const basicProfiles: BasicProfile[] = new Array<BasicProfile>();

        for (const basicAuthor of apiBasicAuthors) 
        {
            let name: string = basicAuthor.name;

            if (basicAuthor.aliases) 
            {
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
        
        basicProfiles.sort((a: BasicProfile, b: BasicProfile) => 
        {
            return  b.paperCount - a.paperCount;
        });
          
        return basicProfiles;
    }
    update(authorId: string): void 
    {
        authorId;
        return;
    }
}
