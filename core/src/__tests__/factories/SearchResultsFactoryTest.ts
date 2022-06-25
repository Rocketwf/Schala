import { SearchResultsFactory, BasicProfile } from '../../index';

describe('builds Tichy`s profile correctly', () => {
    it('must find profiles for query walter tichy correctly', async () => {
        const walterTichy: BasicProfile = new BasicProfile('1679754', 'W. Tichy', [], 7903);
        const testFactory: SearchResultsFactory = new SearchResultsFactory();
        const basicProfiles: BasicProfile[] = await testFactory.build('walter tichy');
        expect(basicProfiles).toContainEqual(walterTichy);
    });
});
