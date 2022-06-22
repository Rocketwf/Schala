import { defineStore } from 'pinia';
import { BasicProfile, FullProfile } from '../../../core/models/profile/Profile'
import { HIndex } from '../../../core/models/profile/HIndex'
import { I10Index } from '../../../core/models/profile/I10Index'
import { ProfileFactory } from '../../../core/factory/profileFactory'
import { ProfileRepresentation } from '../../../core/representations/ProfileRepresentation'

export const useCounterStore = defineStore('profilePage', {
  state: () => ({
    profileId: '',
    //create a BasicProfile with id "000000000" after it is implemented
    fullProfile: new FullProfile(new BasicProfile(), new HIndex(0, 0), new I10Index(0, 0)),
    profileFactory: new ProfileFactory(),
    profileRepresentation: new ProfileRepresentation()
  }),
  getters: {
    getProfileId: (state) => state.profileId,
    getFullProfile: (state) => state.fullProfile,
    getBasicProfile(): BasicProfile {
        return this.fullProfile.getBasicProfile()
    },
    getProfileFactory: (state) => state.profileFactory,
    getProfileRepresentation: (state) => state.profileRepresentation
  },
  actions: {
    setProfileId(newId: string) {
      if (newId === this.getProfileId) {
        this.getProfileRepresentation.renderProfile(this.getFullProfile)
      } else {
        this.profileId = newId
        this.fullProfile = this.getProfileFactory.build(this.getProfileId)
        this.getProfileRepresentation.renderProfile(this.getFullProfile)
      }
    },
  },
});
