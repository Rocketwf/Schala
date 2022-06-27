<template>
  <div class="row justify-center bg-transparent">
    <div class="col-md-12 col-xs-12 self-center">
      <ProfileSummary />
    </div>
    <div class="col-md-12 col-xs-12 self-center">
      <ProfileSummary />
    </div>
    <div class="col-md-12 col-xs-12 self-center">
      <ProfileSummary />
    </div>
    <div class="col-md-12 col-xs-12 self-center">
      <ProfileSummary />
    </div>
  </div>
  <CompareContent />
</template>

<script setup charset="utf-8">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import CompareContent from './CompareContent.vue';
import comparePageStore from '../../stores/comparePageStore'

const getComparePageStore = () => {
    return comparePageStore;
};

const getProfileSummary = () => {
  return ProfileSummary;
}
</script>
