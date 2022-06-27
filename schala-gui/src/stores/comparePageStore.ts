import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation } from 'schala-core';
// import { profilePageStore } from './profilePageStore';

export const comparePageStore = defineStore({
  id : 'comparePage',
  state: () => ({
    fullProfiles: [] as FullProfile[],
    comparisonRepresentation : new ComparisonRepresentation({} as FullProfile),
    // const profilePageStore: ProfilePageStore = new ProfilePageStore();
  }),
  actions: {
    addProfile(profileId: string) {
        profileId;
        if (this.fullProfiles.length > 4) {
            return;
        }
        const fullProfile = {} as FullProfile;
        this.fullProfiles.push(fullProfile);
        return;
    },

    removeProfile(profileId: string) {
        if (this.fullProfiles.length == 0) {
            return;
        }
        this.fullProfiles = this.fullProfiles.filter(p => p.basicProfile.id !== profileId);
    },

    isBeingCompared(profileId: string) {
        for (const profile of this.fullProfiles) {
            if (profile.basicProfile.id === profileId) {
                return true;
            }
        }
        return false;
    },

  },
});
