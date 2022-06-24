import { defineStore } from 'pinia';

export const comparePageStore = defineStore('comparePage', () => {

    function addProfile(profileId: string) {
        return //TODO: Implement this
    }

    function removeProfile(profileId: string) {
        return //TODO: Implement this
    }
    
    function isBeingCompared(profileId: string) {
        return false //TODO: Implement this
    }

    return {
        isBeingCompared,
        addProfile,
        removeProfile
    }
});
