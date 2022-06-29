import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation, ProfileFactory } from 'schala-core';
import { profilePageStore } from './profilePageStore';


const profileStore = profilePageStore();

export const comparePageStore = defineStore({
  id : 'comparePage',
  state: () => ({
    fullProfiles: [] as FullProfile[],
    comparisonRepresentation : new ComparisonRepresentation({} as FullProfile),
    // const profilePageStore: ProfilePageStore = new ProfilePageStore();
  }),
  actions: {
    async addProfile(profileId: string) {
        if (this.fullProfiles.length > 4 || this.isBeingCompared(profileId)) {
            return;
        }
        const profile: FullProfile[] = await new ProfileFactory().build(profileId);
        this.fullProfiles.push(profile[0]);
    },

    removeProfile(profileId: string) {
        if (this.fullProfiles.length == 0) {
            return;
        }
        this.fullProfiles = this.fullProfiles.filter(p => p.basicProfile.id !== profileId);
    },

    getFullProfiles(){
        return this.fullProfiles;
    },

    getComparisonRepresentation (){
        return this.comparisonRepresentation;
    },

    getProfilePageStore (){
        return profileStore;
    },

    isBeingCompared(profileId: string) {
        for (const profile of this.fullProfiles) {
            if (profile.basicProfile.id === profileId ) {
                return true;
            }
        }
        return false;
    },
  },
});
