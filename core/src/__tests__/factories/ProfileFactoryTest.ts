import { ProfileFactory, FullProfile } from '../../index';

describe('builds Tichy`s profile correctly', () => {
    it('Tichy`s profile must be built correctly', async () => {
        const testFactory: ProfileFactory = new ProfileFactory();
        const profiles: FullProfile[] = await testFactory.build('1679754');
        const tichyProfile: FullProfile = profiles[0];
        expect(tichyProfile.hIndex.hIndex).toBe(39);
        expect(tichyProfile.basicProfile.name).toBe('Walter F Tichy');
        expect(tichyProfile.basicProfile.id).toBe('1679754');
        // TODO: Write a meaningful test case that doesn't break on api data changes
        //expect(tichyProfile.basicProfile.totalCitations).toBe(7903);
        expect(tichyProfile.i10Index.i10Index).toBe(153);
        expect(tichyProfile.i10Index.i10IndexWithoutSelfCitations).toBe(45);
        console.log(tichyProfile.selfCitations);
    });
    // TODO: Write a meaningful test case that doesn't break on api data changes
    it('Zervakis`s profile must be built correctly', async () => {
        const testFactory: ProfileFactory = new ProfileFactory();
        const profiles: FullProfile[] = await testFactory.build('50481255');
        profiles;
    });
});
