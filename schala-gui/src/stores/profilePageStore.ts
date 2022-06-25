import { defineStore } from 'pinia';
import { FullProfile, ProfileFactory, ProfileRepresentation } from 'schala-core';

export const profilePageStore = defineStore({
    id : 'profilePage',
    state: () => ({
      profileId : '',
      //create a BasicProfile with id "000000000" after it is implemented
      fullProfile:  {} as FullProfile,
      profileFactory:  new ProfileFactory(),
      profileRepresentation: {} as ProfileRepresentation,
   }),
    actions: {
      setFullProfile(passedFullProfile : FullProfile) {
        this.fullProfile = passedFullProfile;
      },

      setProfileRepresentation(passedRepr : ProfileRepresentation) {
        this.profileRepresentation = passedRepr;
      },

      setProfileId(newId: string) {
        if (newId === this.profileId) {
            this.profileRepresentation.renderProfile();
        } else {
            this.profileId = newId;
            this.profileFactory
                .build(this.profileId)
                .then((profiles: FullProfile[]) => (this.fullProfile = profiles[0]));
            this.profileRepresentation.fullProfile = this.fullProfile;
            this.profileRepresentation.renderProfile();
        }
      },
    },
});
