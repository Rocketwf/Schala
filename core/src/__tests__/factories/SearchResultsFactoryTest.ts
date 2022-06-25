import { SearchResultsFactory, BasicProfile } from '../../index';

describe('builds Tichy`s profile correctly', () => {
    it('Tichy`s profile must be built correctly', async () => {
        const testFactory: SearchResultsFactory = new SearchResultsFactory();
        testFactory.build('walter tichy').then((fullProfiles: BasicProfile[]) => {
            const tichyProfile: BasicProfile = fullProfiles[1];
            expect(tichyProfile.name).toBe('W. Tichy');
            expect(tichyProfile.affiliation).toStrictEqual([]);
            expect(tichyProfile.totalCitations).toBe(7903);
        });
    });
});
