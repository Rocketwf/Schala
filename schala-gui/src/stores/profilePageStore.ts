import { defineStore } from 'pinia';
import { BasicProfile, FullProfile } from '../../../core/models/profile/Profile'
import { HIndex } from '../../../core/models/profile/HIndex'
import { I10Index } from '../../../core/models/profile/I10Index'
import { ProfileFactory } from '../../../core/factory/profileFactory'
import { ProfileRepresentation } from '../../../core/representations/ProfileRepresentation'

export const useCounterStore = defineStore('profilePage', () => {
  
    let profileId = ''
    //create a BasicProfile with id "000000000" after it is implemented
    let fullProfile: FullProfile = new FullProfile(new BasicProfile(), new HIndex(0, 0), new I10Index(0, 0))
    const profileFactory: ProfileFactory = new ProfileFactory()
    const profileRepresentation: ProfileRepresentation = new ProfileRepresentation()

    function getProfileId() {
      return profileId
    }

    function getFullProfile() {
      return fullProfile
    }

    function getBasicProfile(): BasicProfile {
        return fullProfile.basicProfile
    }
    
    function getProfileFactory() {
      return profileFactory
    }

    function getProfileRepresentation() {
      return profileRepresentation
    }

    function setProfileId(newId: string) {
      if (newId === getProfileId()) {
        getProfileRepresentation().renderProfile(getFullProfile())
      } else {
        profileId = newId
        fullProfile = getProfileFactory().build(getProfileId())
        getProfileRepresentation().renderProfile(getFullProfile())
      }
    }

    return {
      getProfileId,
      getFullProfile,
      getProfileFactory,
      getProfileRepresentation,
      setProfileId
    }
});
