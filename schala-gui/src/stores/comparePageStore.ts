import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation, ProfileFactory } from 'schala-core';
import { profilePageStore } from './profilePageStore';

export const comparePageStore = defineStore({
  id : 'comparePage',
  state: () => ({
    fullProfiles: [] as FullProfile[],
    comparisonRepresentation : new ComparisonRepresentation({} as FullProfile),
    profilePageStore: profilePageStore(),
  }),
  actions: {
    async addProfile(profileId: string) {
        if (this.fullProfiles.length > 4) {
            return;
        }

        if(profilePageStore().getProfileId() == profileId){
          const fullProfile = profilePageStore().profileRepresentation.fullProfile;
          console.log(fullProfile);
          this.fullProfiles.push(fullProfile);
        } else{
          const fullProfileNew = await  new ProfileFactory().build(profileId);
          console.log(fullProfileNew);
          this.fullProfiles.push(fullProfileNew[0]);
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
});
