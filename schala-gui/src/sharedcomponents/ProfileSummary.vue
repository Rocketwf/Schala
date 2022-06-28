<template>
    <q-item class="col-md-3 my-content" v-if="profile">
        <q-item-section side>
            <q-item-label class="full-width self-center">
                <q-btn
                v-if="!getComparePageStore().isBeingCompared(getFullProfile().basicProfile.id)" 
                unelevated label= "Compare" class= "full-width no-box-shadow no-border-radius" 
                color="primary" @click ="handleClickButton" />
                <q-btn 
                v-else unelevated label= "Remove" class= "full-width no-box-shadow no-border-radius" 
                color="red" @click ="handleClickButton"/>
            </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label class="vertical-top text-weight-bold text-h6">{{ Name }}</q-item-label>
            <q-item-label caption> ID: {{ ID }}</q-item-label>
            <q-item-label caption> Affiliation: {{ Affiliation }}</q-item-label>
            <q-item-label caption> HIndex: {{ HIndex }}</q-item-label>
            <q-item-label caption> HIndexWithoutSelfCitations: {{ }}</q-item-label>
            <q-item-label caption> TotalCitations: {{ TotalCitations }}</q-item-label>
            <q-item-label caption> SelfCitations: {{ SelfCitations }}</q-item-label>
            <q-item-label caption> IndirectSelfCitations: {{ IndirectSelfCitations }}</q-item-label>
            <q-item-label caption >I10Index : {{ }}</q-item-label>
            <q-item-label caption> Website: {{ 'www.google.com' }}</q-item-label>
            <q-item-label caption>
                <q-btn round color="blue" icon="web" size="8px" class="q-mr-sm" @click="redirectWebsite">
                    <q-tooltip anchor="bottom middle" self="top middle"> visit website </q-tooltip>
                </q-btn>
            </q-item-label>
        </q-item-section>
        <q-item-section side> </q-item-section>
    </q-item>
</template>
<script setup lang="ts">
import { FullProfile } from 'schala-core'
import { I10Index } from 'schala-core/dist/models/profile';
import { useRouter, Router } from 'vue-router';
import { comparePageStore } from '../stores/comparePageStore';

const router: Router = useRouter();

const props = defineProps<{
    profile: FullProfile;
}>();

// Methods
const getFullProfile = (): FullProfile => {
    return props.profile;
};

const getComparePageStore = () => {
    return comparePageStore();
}

const redirectWebsite = () => {
    window.open(Website, "_blank");
}

const handleClickButton = () => {
    if(!getComparePageStore().isBeingCompared(getFullProfile().basicProfile.id)) {
        getComparePageStore().addProfile(getFullProfile().basicProfile.id);
        router.push({ path: '/profile/compare' });
    } else {
         getComparePageStore().removeProfile(getFullProfile().basicProfile.id);
    }
}
 
// Attributes
const ID: string = getFullProfile().basicProfile.id;
const Name: string = getFullProfile().basicProfile.name;
const Affiliation: string[] = getFullProfile().basicProfile.affiliation;
const HIndex: number = getFullProfile().hIndex.hIndex;
//const HIndexWithoutSelfCitations: number = getFullProfile().hIndex.hIndexWithoutSelfCitations;
const TotalCitations: number = getFullProfile().basicProfile.totalCitations;
const SelfCitations: number = getFullProfile().selfCitations;
const IndirectSelfCitations: number = getFullProfile().indirectSelfCitations;
//const I10Index: number = getFullProfile().i10Index.i10Index;
const Website: string = 'http://www.google.com';
//const Website: string = getFullProfile().website;


</script>
<style lang="sass" scoped>
.my-content
  margin: 0 2px
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>

