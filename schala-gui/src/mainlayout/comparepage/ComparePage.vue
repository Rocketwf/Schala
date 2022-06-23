<template>
  <profile-summary />
</template>

<script lang = "ts">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue'
import comparePageStore from '../../stores/'
import MainLayoutVue from '../MainLayout.vue'

const getComparePageStore = () => {
  return comparePageStore;
}

const getProfileSummary = () => {
  return ProfileSummary
;
}
</script>
