import { defineStore } from 'pinia';

export const comparePageStore = defineStore('comparePage', () => {
    function addProfile(profileId: string) {
        profileId;
        return; //TODO: Implement this
    }

    function removeProfile(profileId: string) {
        profileId;
        return; //TODO: Implement this
    }

    function isBeingCompared(profileId: string) {
        profileId;
        return false; //TODO: Implement this
    }

    return {
        isBeingCompared,
        addProfile,
        removeProfile,
    };
});
