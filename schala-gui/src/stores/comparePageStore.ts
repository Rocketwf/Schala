import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation, ProfileFactory } from 'schala-core';
// import { profilePageStore } from './profilePageStore';

export const comparePageStore = defineStore({
  id : 'comparePage',
  state: () => ({
    fullProfiles: [] as FullProfile[],
    comparisonRepresentation : new ComparisonRepresentation({} as FullProfile),
    // const profilePageStore: ProfilePageStore = new ProfilePageStore();
  }),
  actions: {
    async addProfile(profileId: string) {
      let fullProfile: FullProfile;
        if (this.fullProfiles.length > 4) {
            return;
        } else {
          if (this.isBeingCompared(profileId)) {
            const factory: ProfileFactory = new ProfileFactory();
            fullProfile = (await factory.build(profileId))[0];
            this.fullProfiles.push(fullProfile);
          }
        }
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
  getters: {
    getFullProfiles(state): FullProfile[] {
      return state.fullProfiles as FullProfile[];
    }
  }
});
