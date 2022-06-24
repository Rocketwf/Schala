import { ProfileFactory, FullProfile } from '../../index';

describe('builds Tichy`s profile correctly', () => {
    it('Tichy`s profile must be built correctly', async () => {
        const testFactory: ProfileFactory = new ProfileFactory();
        const tichyProfile: FullProfile = testFactory.build('1679754')[0];
        expect(tichyProfile.hIndex.hIndex).toBe(39);
        expect(tichyProfile.basicProfile.name).toBe('W. Tichy');
        expect(tichyProfile.basicProfile.id).toBe('1679754');
        expect(tichyProfile.basicProfile.totalCitations).toBe(7903);
    });
});
