
import { defineStore } from 'pinia';
import { FullProfile, ProfileFactory, ProfileRepresentation } from 'schala-core';

export const profilePageStore = defineStore({
    id : 'profilePage',
    state: () => ({
      profileId : '',
      profileRepresentation: {} as ProfileRepresentation,
   }),
    actions: {

      setProfileRepresentation(passedRepr : ProfileRepresentation) {
        this.profileRepresentation = passedRepr;
      },

      async setProfileId(newId: string) {
        if (newId === this.profileId) {
            this.profileRepresentation.renderProfile();
        } else {
            this.profileId = newId;
            const profile: FullProfile[] = await new ProfileFactory().build(this.profileId);
            
                
            this.profileRepresentation.fullProfile = profile[0];
            console.log(profile[0]);
            //this.profileRepresentation.renderProfile();
        }
      },
    },
});
