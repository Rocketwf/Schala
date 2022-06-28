<template>
  <div class="row justify-center bg-transparent" >
    <div
v-for="profile of (store.getFullProfiles)"
      :key="profile.basicProfile.id" style="width:25%">
      <div class="col-md-3 col-xs-12 self-center" >
        <ProfileSummary :profile="profile" />
      </div>
    </div>
  </div>
  <CompareContent />
</template>

<script setup lang="ts" charset="utf-8">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import CompareContent from './CompareContent.vue';
import { comparePageStore } from '../../stores/comparePageStore'
import { FullProfile } from 'schala-core';
FullProfile;
const getComparePageStore = () => {
    return comparePageStore;
};
getComparePageStore;

const getProfileSummary = () => {
  return ProfileSummary;
}
getProfileSummary;

const store = comparePageStore();

</script>
