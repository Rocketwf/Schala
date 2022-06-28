<template>
    <q-item class="col-md-3 my-content" v-if="profile">
        <q-item-section side>
            <q-avatar square style="width: 145px; height: 180px">
                <img
                    src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=23RPQBQAAAAJ&citpid=2"
                />
            </q-avatar>
            <q-item-label class="full-width self-center">
                <q-btn
                    unelevated
                    :label="buttonLabel()"
                    class="full-width no-box-shadow no-border-radius"
                    :color="buttonColor()"
                    @click="AddOrRemove"
                />
            </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label class="vertical-top text-weight-bold text-h6">{{ Name }}</q-item-label>
            <q-item-label caption>{{ ID }}</q-item-label>
            <q-item-label caption>{{ Affiliation }}</q-item-label>
            <q-item-label caption>{{ Hindex }}</q-item-label>
            <q-item-label caption>
                <q-btn round color="blue" icon="web" size="8px" class="q-mr-sm">
                    <q-tooltip anchor="bottom middle" self="top middle"> visit website </q-tooltip>
                </q-btn>
            </q-item-label>
        </q-item-section>
        <q-item-section side> </q-item-section>
    </q-item>
</template>
<script setup lang="ts">
import { FullProfile } from 'schala-core'
import { comparePageStore } from '../stores/comparePageStore';

const props = defineProps<{
    profile: FullProfile;
}>();

// Methods
const getFullProfile = (): FullProfile => {
    return props.profile;
};

const getComparePageStore = () => {
    return comparePageStore();
};

function AddOrRemove() {
  if (!isBeingCompared) {
    getComparePageStore().addProfile(getFullProfile().basicProfile.id);
  } else{
    getComparePageStore().removeProfile(getFullProfile().basicProfile.id);
  }
  isBeingCompared = !isBeingCompared;
}

function buttonColor(): string {
  return isBeingCompared ? 'red' : 'primary';
}

function buttonLabel(): string {
  return isBeingCompared ? 'Remove' : 'Compare';
}

// Attributes
const ID: string = getFullProfile().basicProfile.id;
const Name: string = getFullProfile().basicProfile.name;
const Affiliation: string[] = getFullProfile().basicProfile.affiliation;
const Hindex: number = getFullProfile().hIndex.hIndex;
let isBeingCompared: boolean = false;


</script>
<style lang="sass" scoped>
.my-content
  margin: 0 2px
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>

