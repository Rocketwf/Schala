<template>
  <div class="row justify-center bg-transparent">
      <div v-for="profile of profileArray"
      :key="profile.basicProfile.id">
        <div class="col-md-4 col-xs-12 self-center">
          <ProfileSummary :profile="profile"/>
        </div>
      </div>
  </div>
  <CompareContent />
</template>

<script setup lang="ts" charset="utf-8">
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import CompareContent from './CompareContent.vue';
import { comparePageStore } from '../../stores/comparePageStore'
import { BasicProfile, FullProfile } from 'schala-core';
import { HIndex, I10Index } from 'schala-core/dist/models/profile';

const getComparePageStore = () => {
    return comparePageStore;
};
getComparePageStore;

const getProfileSummary = () => {
  return ProfileSummary;
}
getProfileSummary;

const store = comparePageStore();

//Cloning of the full profile array in the compare page store because the objects delivered by the store are not really full profiles
//but weird readonly objects. Extensive googling yielded no results :(
let profileArray: FullProfile[] = new Array<FullProfile>();
for(const profile of store.fullProfiles) {
  profileArray.push( new FullProfile (
    new BasicProfile(profile.basicProfile.id, profile.basicProfile.name, profile.basicProfile.affiliation, profile.basicProfile.totalCitations),
    new HIndex(profile.hIndex.hIndex, profile.hIndex.hIndexWithoutSelfCitations),
    new I10Index(profile.i10Index.i10Index, profile.i10Index.i10IndexWithoutSelfCitations)
    )
  )
}
//For testing purposes, delete these 2 lines
profileArray = new Array<FullProfile>();
profileArray.push(new FullProfile(new BasicProfile('a', 'b', [], 10), new HIndex(5, 6), new I10Index(7, 8)))
</script>
