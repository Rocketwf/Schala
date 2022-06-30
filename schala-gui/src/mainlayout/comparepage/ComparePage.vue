<template>
    <div class="row justify-center bg-transparent" style="100%">
        <div
            class="col-md-3 col-xs-12 self-center"
            v-for="profile of getComparePageStore().fullProfiles"
            :key="profile.basicProfile.id"
        >
            <ProfileSummary :profile="profile as FullProfile" />
        </div>
    </div>
</template>

<script setup lang="ts" charset="utf-8">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import { comparePageStore } from '../../stores/comparePageStore';
import { FullProfile } from 'schala-core';
FullProfile;
const compareStore = comparePageStore();
const getComparePageStore = () => {
    return compareStore;
};
getComparePageStore;

const getProfileSummary = () => {
    return ProfileSummary;
};
getProfileSummary;
</script>
