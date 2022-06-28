<template>
  <div class="row justify-center bg-transparent">
    <div class="col-md-12 col-xs-12 self-center">
           <profile-summary v-if="getFullProfile()" :profile = "getFullProfile()"/>
    </div>
  </div>
</template>
<script setup lang= "ts">
import { profilePageStore } from '../../stores/profilePageStore';
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue'
import { FullProfile } from 'schala-core';
FullProfile;

const profileStore = profilePageStore();
//const pagination = ... TODO: Add Pagination

const getProfilePageStore = () => {
    return profileStore;
};

const getFullProfile = () => {
  return getProfilePageStore().profileRepresentation.fullProfile as FullProfile;
}

</script>
