import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIBasicAuthor } from '../models/API';
import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';
import { Expertise } from '../models/profile/Expertise';
import { APIPaper } from '../models/API/API';

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
        const apiBasicAuthors: APIBasicAuthor[] = await this.dataSource.fetchSearchResults(query);
        const basicProfiles: BasicProfile[] = new Array<BasicProfile>();

        for (const basicAuthor of apiBasicAuthors) 
        {
            let name: string = basicAuthor.name;

            if (basicAuthor.aliases) 
            {
                name = basicAuthor.aliases[basicAuthor.aliases.length > 1 ? 1 : 0];
            }

            const bp: BasicProfile = new BasicProfile(
                basicAuthor.authorId,
                name,
                basicAuthor.affiliations,
                +basicAuthor.citationCount,
                +basicAuthor.paperCount,
                '',
                this.buildExpertise(basicAuthor.papers),
                basicAuthor.name
            );

            basicProfiles.push(bp);
        }

        basicProfiles.sort((a: BasicProfile, b: BasicProfile) => 
        {
            return b.paperCount - a.paperCount;
        });

        return basicProfiles;
    }
    update(authorId: string): void 
    {
        authorId;
        return;
    }
    /**
     * Builds the expertises list of the papers being passed
     * @param apiPapers - apiPapers object array of the papers to build
     * @returns Array of the expertises from the papers
     */
    private buildExpertise(apiPapers: APIPaper[]): Expertise[] 
    {
        const expertise: Map<string, Expertise> = new Map<string, Expertise>();
        for (const apiPaper of apiPapers) 
        {
            if (!apiPaper.fieldsOfStudy) continue;
            for (const fieldOfStudy of apiPaper.fieldsOfStudy) 
            {
                if (!expertise.has(fieldOfStudy)) 
                {
                    expertise.set(fieldOfStudy, new Expertise(fieldOfStudy, 1));
                }
                else 
                {
                    const newCount: number = expertise.get(fieldOfStudy).count + 1;
                    expertise.set(fieldOfStudy, new Expertise(fieldOfStudy, newCount));
                }
            }
        }
        const sortedExpertise: Expertise[] = Array.from(expertise.values()).sort(this.sortExpertise);
        return sortedExpertise;
    }

    private sortExpertise(a: Expertise, b: Expertise): number 
    {
        if (a.count > b.count) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }
}
