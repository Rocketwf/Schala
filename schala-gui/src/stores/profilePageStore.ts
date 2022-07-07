import { defineStore } from 'pinia';
import { FullProfile, SemanticScholarSource, ProfileRepresentation } from 'schala-core';

export const profilePageStore = defineStore({
    id: 'profilePage',
    state: () => ({
        profileId: '',
        profileRepresentation: {} as ProfileRepresentation,
    }),
    actions: {
        setProfileRepresentation(passedRepr: ProfileRepresentation) {
            this.profileRepresentation = passedRepr;
        },

        getProfileRepresentation() {
            return this.profileRepresentation;
        },
        getProfileId(): string {
            return this.profileId;
        },

        async setProfileId(newId: string) {
            if (newId !== this.profileId) {
                this.profileId = newId;
                const profile: FullProfile = await SemanticScholarSource.getInstance().fetchFullProfile(
                    this.profileId,
                );
                this.profileRepresentation = new ProfileRepresentation(profile);
            }
            this.profileRepresentation.renderProfile();
        },

        getFullProfile() {
            return this.getProfileRepresentation().fullProfile as FullProfile;
        },

        getBasicProfile() {
            return this.getProfileRepresentation().fullProfile.basicProfile;
        },
    },
});
