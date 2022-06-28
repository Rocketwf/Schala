
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

      getProfileId(): string{
          return this.profileId;
      },


      async setProfileId(newId: string) {
        if (newId === this.profileId) {

        } else {
            this.profileId = newId;
            const profile: FullProfile[] = await new ProfileFactory().build(this.profileId);
            this.profileRepresentation = new ProfileRepresentation(profile[0]);


            this.profileRepresentation.fullProfile = profile[0];
            console.log(profile[0]);
        }
        this.profileRepresentation.renderProfile();
      },
    },
});
