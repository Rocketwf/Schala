
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

      getProfileRepresentation() {
         return this.profileRepresentation;
      } ,
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


      getFullProfile() {
        return this.getProfileRepresentation().fullProfile;
      },
    
      getBasicProfile() {
        return this.getProfileRepresentation().fullProfile.basicProfile;
      }
    },
});
