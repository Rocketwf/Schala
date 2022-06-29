<template>
  <div class="row justify-center bg-transparent">
  </div>
</template>

<script setup charset="utf-8">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import CompareContent from './CompareContent.vue';
import { comparePageStore } from '../../stores/comparePageStore'

const getComparePageStore = () => {
    return comparePageStore;
};
getComparePageStore;

const getProfileSummary = () => {
  return ProfileSummary;
}
getProfileSummary;
CompareContent;
</script>
