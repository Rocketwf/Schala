import { Loading } from 'quasar';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { FullProfile, SemanticScholarSource, ProfileRepresentation } from 'schala-core';

export const profilePageStore = defineStore({
    id: 'profilePage',
    state: () => ({
        profileId: useStorage('profileId', ''),
        profileRepresentation: {} as ProfileRepresentation,
    }),
    actions: {
        setProfileRepresentation(passedRepr: ProfileRepresentation) 
        {
            this.profileRepresentation = passedRepr;
        },

        getProfileRepresentation() 
        {
            return this.profileRepresentation;
        },
        getProfileId(): string 
        {
            return this.profileId;
        },
        async renderSaved() 
        {
            Loading.show();
            const profile: FullProfile = await SemanticScholarSource.getInstance().fetchFullProfile(this.profileId);
            this.profileRepresentation = new ProfileRepresentation(profile);
            this.profileRepresentation.renderProfile();
            Loading.hide();
        },
        async setProfileId(newId: string) 
        {
            Loading.show();
            if (newId !== this.profileId) 
            {
                this.profileId = newId;
                try 
                {
                    const profile: FullProfile = await SemanticScholarSource.getInstance().fetchFullProfile(this.profileId);
                    this.profileRepresentation = new ProfileRepresentation(profile);
                    this.profileRepresentation.renderProfile();
                    Loading.hide();
                } 
                catch (error) 
                {
                    console.log(error);
                    return;
                }
                
            }
        },

        getFullProfile() 
        {
            return this.getProfileRepresentation().fullProfile as FullProfile;
        },

        getBasicProfile() 
        {
            return this.getProfileRepresentation().fullProfile.basicProfile;
        },
    },
});
