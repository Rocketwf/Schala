import { Loading } from 'quasar';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation, SemanticScholarSource } from 'schala-core';
import { profilePageStore } from './profilePageStore';
const profileStore = profilePageStore();

/**
 * Stores elements needed for ComparePage.
 */
export const comparePageStore = defineStore({
    id: 'comparePage',
    state: () => ({
        profileIds: useStorage('profileIds', [] as string[]),
        /**
         * class responsible for rendering a comparison.
         */
        comparisonRepresentation: new ComparisonRepresentation([] as FullProfile[]),

        /**
         * Store where the info of ProfilePage is stored.
         */
        profilePageStore: profilePageStore(),
    }),
    actions: {
        async renderSaved() {
            Loading.show();
            for (const id of this.profileIds) {
                if(this.comparisonRepresentation.fullProfiles.find(fp => fp.basicProfile.id === id)) continue;
                const fullProfile: FullProfile = await SemanticScholarSource.getInstance().fetchFullProfile(id);;
                this.comparisonRepresentation.fullProfiles.push(fullProfile);
            }
            this.comparisonRepresentation.renderComparison();
            Loading.hide();
        },
        /**
         * Adds the profile with the given ID, if it is present in ProfilePageStore,
         * otherwise it uses the ProfileFactory from the ProfilePageStore
         * to build a FullProfile.
         */
        async addProfile(profileId: string) {
            Loading.show();
            this.profileIds.push(profileId);
            let fullProfile: FullProfile;
            if (this.profilePageStore.profileId === profileId) {
                fullProfile = this.profilePageStore.getFullProfile();
            } else {
                fullProfile = await SemanticScholarSource.getInstance().fetchFullProfile(profileId);
            }
            this.comparisonRepresentation.fullProfiles.push(fullProfile);
            this.comparisonRepresentation.renderComparison();
            Loading.hide();
        },

        /**
         * Removes the given profile if it is present.
         * @param profileId - to be removed profile's id
         * @returns null
         */
        removeProfile(profileId: string) {
            this.profileIds.splice(this.profileIds.indexOf(profileId), 1);
            if (this.comparisonRepresentation.fullProfiles.length === 0) {
                return;
            }
            this.comparisonRepresentation.fullProfiles = this.comparisonRepresentation.fullProfiles.filter(
                (p) => p.basicProfile.id !== profileId,
            );
            this.comparisonRepresentation.renderComparison();
        },

        /**
         * Getter method of ComparisonRepresentation.
         * @returns ComparisonRepresentation
         */
        getComparisonRepresentation() {
            return this.comparisonRepresentation;
        },

        /**
         * Getter method of ProfilePageStore.
         * @returns ProfilePageStore
         */
        getProfilePageStore() {
            return profileStore;
        },

        /**
         * Returns whether the given profileId is being compared.
         * @param profileId - to be checked profile's id
         * @returns true if the profile is in comparison
         */
        isBeingCompared(profileId: string) {
            for (const profile of this.comparisonRepresentation.fullProfiles) {
                if (profile.basicProfile.id === profileId) {
                    return true;
                }
            }
            return false;
        },
    },
});
