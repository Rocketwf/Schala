import { SearchResultsFactory, BasicProfile } from '../../index';

describe('must find profiles for query walter tichy correctly', () => {
    it('must find profiles for query walter tichy correctly', async () => {
        const testFactory: SearchResultsFactory = new SearchResultsFactory();
        const basicProfiles: BasicProfile[] = await testFactory.build('walter tichy');
        let basicProfile: BasicProfile;
        let exist: boolean = false;
        for (basicProfile of basicProfiles) {
            exist =
                basicProfile.name === 'Walter F Tichy' &&
                basicProfile.affiliation.length === 0 &&
                basicProfile.totalCitations === 7903;
            if (exist) break;
        }
        expect(exist).toBe(true);
    });
});
