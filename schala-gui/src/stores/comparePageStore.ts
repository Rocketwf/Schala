import { defineStore } from 'pinia';
import { FullProfile, ComparisonRepresentation } from 'schala-core';
// import { profilePageStore } from './profilePageStore';


export const comparePageStore = defineStore('comparePage', () => {

  let fullProfiles: FullProfile[] = [];
  const comparisonRepresentation: ComparisonRepresentation = new ComparisonRepresentation({} as FullProfile);
  // const profilePageStore: ProfilePageStore = new ProfilePageStore();


  function addProfile(profileId: string) {
    if (fullProfiles.length > 4) {
      return;
    }
    const fullProfile = {} as FullProfile;
    fullProfiles.push(fullProfile);
    return
  }

  function removeProfile(profileId: string) {
    if (fullProfiles.length == 0) {
      return;
    }
    fullProfiles = fullProfiles.filter(p => p.basicProfile.id !== profileId);
  }

  function isBeingCompared(profileId: string) {
    for (const profile of fullProfiles) {
      if (profile.basicProfile.id === profileId) {
        return true;
      }
    }
    return false
  }

  function getFullProfiles(): FullProfile[] {
    return fullProfiles;
  }

   function getComparisonRepresentation() : ComparisonRepresentation {
     return comparisonRepresentation;
   }

  // function getProfilePageStore() : ProfilePageStore {
  //   return profilePageStore;
  // }

  return {
    isBeingCompared,
    addProfile,
    removeProfile,
    getFullProfiles,
    getComparisonRepresentation,
    // getProfilePageStore
  }

});
