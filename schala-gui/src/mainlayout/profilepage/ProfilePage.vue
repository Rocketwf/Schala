<template>
  <div class="row justify-center bg-transparent">
    <div class="col-md-12 col-xs-12 self-center">
      <ProfileSummary />
    </div>
  </div>
  <ProfileContent />
</template>
<script setup charset="utf-8">
import { profilePageStore } from 'src/stores/profilePageStore';
import ProfileSummary from 'src/sharedcomponents/ProfileSummary.vue';
import ProfileContent from './ProfileContent.vue';

const getProfilePageStore = () => {
  return profilePageStore();
}


</script>
