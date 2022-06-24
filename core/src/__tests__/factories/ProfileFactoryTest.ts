import { ProfileFactory, FullProfile } from '../../index';
import { SemanticScholarSource } from '../../datasources';

describe('builds Tichy`s profile correctly', () => {
    beforeAll(async () => {
        await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
    });
    it('Tichy`s profile must be built correctly', async () => {
        const testFactory: ProfileFactory = new ProfileFactory();
        testFactory.build('1679754').then((fullProfiles: FullProfile[]) => {
            const tichyProfile: FullProfile = fullProfiles[0];
            expect(tichyProfile.hIndex.hIndex).toBe(39);
            expect(tichyProfile.basicProfile.name).toBe('W. Tichy');
            expect(tichyProfile.basicProfile.id).toBe('1679754');
            expect(tichyProfile.basicProfile.totalCitations).toBe(7903);
        });
    });
});
