import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation, ProfileFactory } from 'schala-core';
import { profilePageStore } from './profilePageStore';
const profileStore = profilePageStore();

export const comparePageStore = defineStore({
    id: 'comparePage',
    state: () => ({
        comparisonRepresentation: new ComparisonRepresentation([] as Array<FullProfile>),
        profilePageStore: profilePageStore(),
    }),
    actions: {
        async addProfile(profileId: string) {
            let fullProfile: FullProfile;
            if (this.profilePageStore.profileId === profileId) {
                fullProfile = this.profilePageStore.getFullProfile();
            } else {
                fullProfile = (await new ProfileFactory().build(profileId))[0];
            }
            this.comparisonRepresentation.fullProfiles.push(fullProfile);
            this.comparisonRepresentation.renderComparison();
        },

        removeProfile(profileId: string) {
            if (this.comparisonRepresentation.fullProfiles.length == 0) {
                return;
            }
            this.comparisonRepresentation.fullProfiles = this.comparisonRepresentation.fullProfiles.filter(
                (p) => p.basicProfile.id !== profileId,
            );
            this.comparisonRepresentation.renderComparison();
        },

        getComparisonRepresentation() {
            return this.comparisonRepresentation;
        },

        getProfilePageStore() {
            return profileStore;
        },

        isBeingCompared(profileId: string) {
            console.log(this.comparisonRepresentation.fullProfiles);
            for (const profile of this.comparisonRepresentation.fullProfiles) {
                if (profile.basicProfile.id === profileId) {
                    return true;
                }
            }
            return false;
        },
    },
});
