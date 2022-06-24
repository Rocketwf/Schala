import { SemanticScholarSource } from '../datasources';
import { BasicProfile } from '../models/profile/Profile';

// TODO: Implement SearchResultsFactory
export class SearchResultsFactory {
    build(query: string): Array<BasicProfile> {
        const basicProfiles: Array<BasicProfile> = new Array<BasicProfile>();

        SemanticScholarSource.getInstance()
            .fetchAuthorIds(query)
            .then((authorIds) => {
                authorIds.forEach((authorId) => {
                    const basicProfile: BasicProfile = new BasicProfile(authorId);
                    basicProfiles.push(basicProfile);
                });
            })
            .then(() => {
                basicProfiles.forEach((basicProfile) => {
                    SemanticScholarSource.getInstance()
                        .fetchName(basicProfile.id)
                        .then((name) => {
                            basicProfile.name = name;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchAffiliation(basicProfile.id)
                        .then((affiliation) => {
                            basicProfile.affiliation = affiliation;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchCitation(basicProfile.id)
                        .then((totalCitations) => {
                            basicProfile.totalCitations = totalCitations;
                        });
                    SemanticScholarSource.getInstance()
                        .fetchName(basicProfile.id)
                        .then((name) => {
                            basicProfile.name = name;
                        });
                });
            });

        return basicProfiles;
    }
}
