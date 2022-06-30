<template>
    <div class="row justify-center bg-transparent">
        <div class="col-md-12 col-xs-12 self-center">
            <profile-summary v-if="getFullProfile()" :profile="getFullProfile() as FullProfile" />
        </div>
    </div>
    <profile-content :profile-repr="getProfilePageStore().profileRepresentation as ProfileRepresentation" />
</template>
<script setup lang= "ts">
import { profilePageStore } from '../../stores/profilePageStore';
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import ProfileContent from './ProfileContent.vue';
import { FullProfile, ProfileRepresentation } from 'schala-core';
ProfileRepresentation;
FullProfile;

const profileStore = profilePageStore();
//const pagination = ... TODO: Add Pagination

const getProfilePageStore = () => {
    return profileStore;
};

const getFullProfile = () => {
    return getProfilePageStore().profileRepresentation.fullProfile;
};
</script>
