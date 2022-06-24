import { defineStore } from 'pinia';
import { BasicProfile, FullProfile, ProfileFactory, ProfileRepresentation } from 'schala-core'

export const profilePageStore = defineStore('profilePage', () => {
  
    let profileId = ''
    //create a BasicProfile with id "000000000" after it is implemented
    let fullProfile: FullProfile = {} as FullProfile;
    const profileFactory: ProfileFactory = new ProfileFactory()
    const profileRepresentation: ProfileRepresentation = new ProfileRepresentation(fullProfile)

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
        getProfileRepresentation().renderProfile()
      } else {
        profileId = newId
        fullProfile = getProfileFactory().build(getProfileId())[0]
        getProfileRepresentation().fullProfile = fullProfile
        getProfileRepresentation().renderProfile()
      }
    }

    return {
      getProfileId,
      getFullProfile,
      getBasicProfile,
      getProfileFactory,
      getProfileRepresentation,
      setProfileId
    }
});
