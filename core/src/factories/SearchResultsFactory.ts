import { SemanticScholarSource } from '../datasources';
import { BasicProfile } from '../models/profile/Profile';

// TODO: Implement SearchResultsFactory
export class SearchResultsFactory {
    build(query: string): Array<BasicProfile> {
        const basicProfiles: Array<BasicProfile> = new Array<BasicProfile>();

        SemanticScholarSource.getInstance()
            .fetchAuthorIds(query)
            .then((authorIds: string[]) => {
                authorIds.forEach((authorId: string) => {
                    const basicProfile: BasicProfile = new BasicProfile(authorId);
                    basicProfiles.push(basicProfile);
                });
            })
            .then(() => {
                basicProfiles.forEach((basicProfile: BasicProfile) => {
                    SemanticScholarSource.getInstance()
                        .fetchName(basicProfile.id)
                        .then((name: string) => {
                            basicProfile.name = name;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchAffiliations(basicProfile.id)
                        .then((affiliation: string[]) => {
                            basicProfile.affiliation = affiliation;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchCitation(basicProfile.id)
                        .then((totalCitations: number) => {
                            basicProfile.totalCitations = totalCitations;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchName(basicProfile.id)
                        .then((name: string) => {
                            basicProfile.name = name;
                        });
                });
            });

        return basicProfiles;
    }
}
