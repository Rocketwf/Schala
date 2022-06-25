import { SearchResultsFactory, BasicProfile } from '../../index';

describe('builds Tichy`s profile correctly', () => {
    it('must build Tichy`s profile correctly', async () => {
        const testFactory: SearchResultsFactory = new SearchResultsFactory();
        const basicProfiles: BasicProfile[] = await testFactory.build('walter tichy');
        let basicProfile: BasicProfile;
        for (basicProfile of basicProfiles) {
            if (
                basicProfile.name == 'W. Tichy' &&
                basicProfile.affiliation == [] &&
                basicProfile.totalCitations == 7903
            ) {
                return true;
            }
        }
        return false;
    });
});
