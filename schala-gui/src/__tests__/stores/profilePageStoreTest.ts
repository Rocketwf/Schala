import { describe, expect, it, beforeEach } from '@jest/globals';
import { BasicProfile, FullProfile } from 'schala-core';
import {
    CitationByYear,
    CitedScholar,
    PublicationByVenue,
    PublicationByYear,
    ProfileExpertise
} from 'schala-core/dist/models/profile/Profile';
import { createPinia, setActivePinia } from 'pinia';
import { ProfileRepresentation } from 'schala-core';
import { profilePageStore } from 'src/stores/profilePageStore';

describe('comparePageStore', () => 
{
    beforeEach(() => 
    {
        setActivePinia(createPinia());
    });

    it('sets profile', () => 
    {
        const store = profilePageStore();
        store.setProfileId('1');
        expect(store.getProfileId()).toEqual('1');
    });

    it('sets profileRespresentation', () => 
    {
        const store = profilePageStore();
        const testProfile: FullProfile = new FullProfile(
            [new ProfileExpertise('a', 2), new ProfileExpertise('b', 3), new ProfileExpertise('c', 4)],
            1000,
            1001,
            2000,
            2001,
            3000,
            3001,
            4000,
            '4001',
            new BasicProfile('100'),
            [new PublicationByYear(2022, 10)],
            [new PublicationByVenue('KIT', 11)],
            [new CitationByYear(2022, 20, 21, 22)],
            [new CitedScholar('Cited Test Person', 9)],
            [],
            [],
        );
        store.setProfileRepresentation(new ProfileRepresentation(testProfile));
        expect(store.getProfileRepresentation().fullProfile.basicProfile.id).toBe('100');
    });
});
