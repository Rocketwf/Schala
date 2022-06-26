import { DataSource, SemanticScholarSource } from '../datasources';
import { BasicProfile } from '../models/profile/Profile';
import { Factory } from './Factory';

export class SearchResultsFactory implements Factory {
    private dataSource: DataSource = SemanticScholarSource.getInstance();

    async build(query: string): Promise<Array<BasicProfile>> {
        const authorIds: string[] = await this.dataSource.fetchAuthorIds(query);
        const basicProfiles: Array<BasicProfile> = new Array<BasicProfile>();
        for (const authorId of authorIds) {
            const name: string = this.dataSource.fetchName(authorId);
            const affiliation: string[] = this.dataSource.fetchAffiliations(authorId);
            const totalCitations: number = this.dataSource.fetchCitation(authorId);
            basicProfiles.push(new BasicProfile(authorId, name, affiliation, totalCitations));
        }
        return basicProfiles;
    }
}
