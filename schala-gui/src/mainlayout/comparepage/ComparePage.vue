<template>
    <profile-smmary />
</template>

<script lang="ts" setup>
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
/*import CompareContent from './CompareContent.vue';*/
import { comparePageStore } from '../../stores/comparePageStore';

const getComparePageStore = () => {
    return comparePageStore;
};

const getProfileSummary = () => {
    return ProfileSummary;
};
getProfileSummary;
getComparePageStore;
</script>
