import { SemanticScholarSource } from '../datasources';
import { BasicProfile } from '../models/profile/Profile';
import { Factory } from './Factory';

export class SearchResultsFactory implements Factory {
    async build(query: string): Promise<Array<BasicProfile>> {
        const authorIds: string[] = await SemanticScholarSource.getInstance().fetchAuthorIds(query);
        const basicProfiles: Array<BasicProfile> = new Array<BasicProfile>();
        for (const authorId of authorIds) {
            const name: string = await SemanticScholarSource.getInstance().fetchName(authorId);
            const affiliation: string[] = await SemanticScholarSource.getInstance().fetchAffiliations(authorId);
            const totalCitations: number = await SemanticScholarSource.getInstance().fetchCitation(authorId);
            basicProfiles.push(new BasicProfile(authorId, name, affiliation, totalCitations));
        }
        return basicProfiles;
    }
}
