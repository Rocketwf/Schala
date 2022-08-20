<template>
  <q-item
    class="col-md-3 my-content vertical-middle"
    style="height: 100%;"
    v-if="profile"
  >
    <q-item-section side>
      <q-avatar
        v-if="props.profile.basicProfile.pictureURL"
        square
        style="width: 145px; height: 180px"
      >
        <img :src="props.profile.basicProfile.pictureURL">
      </q-avatar>

      <q-item-label class="full-width self-center">
        <q-btn
          v-if="!comparePageStore().isBeingCompared(getFullProfile().basicProfile.id)"
          unelevated
          label="Compare"
          class="full-width no-box-shadow no-border-radius"
          color="primary"
          @click="handleClickButton"
        />
        <q-btn
          v-else
          unelevated
          label="Remove"
          class="full-width no-box-shadow no-border-radius"
          color="red"
          @click="handleClickButton"
        />
      </q-item-label>
    </q-item-section>
    <q-item-section top>
      <q-item-label class="vertical-top text-weight-bold text-h6">
        {{ getFullProfile().basicProfile.name }}
      </q-item-label>
      <q-item-label caption>
        ID: {{ getFullProfile().basicProfile.id }}
      </q-item-label>
      <q-item-label 
        caption 
        v-if="affiliation"
      > 
        Affiliation: {{ affiliation }}
      </q-item-label>
      <q-item-label caption>
        H-Index: {{ getFullProfile().hIndex }}
      </q-item-label>
      <q-item-label caption>
        H-Index without self-citations: {{ getFullProfile().hIndexWithoutSelfCitations }}
      </q-item-label>
      <q-item-label caption>
        Total citations: {{ getFullProfile().basicProfile.totalCitations }}
      </q-item-label>
      <q-item-label caption>
        Self citations: {{ getFullProfile().selfCitationsCount }}
      </q-item-label>
      <q-item-label caption>
        Indirect self citations: {{ getFullProfile().indirectSelfCitationsCount }}
      </q-item-label>
      <q-item-label caption>
        I10-Index : {{ getFullProfile().i10Index }}
      </q-item-label>
      <q-item-label caption>
        I10-Index without self citations : {{ getFullProfile().i10IndexWithoutSelfCitations }}
      </q-item-label>
      <q-item-label
        caption
        v-if="props.profile.url"
      >
        <q-btn
          round
          color="blue"
          icon="web"
          size="8px"
          class="q-mr-sm"
          @click="redirectWebsite"
        >
          <q-tooltip
            anchor="bottom middle"
            self="top middle"
          >
            visit website
          </q-tooltip>
        </q-btn>
      </q-item-label>
    </q-item-section>
    <q-item-section side />
  </q-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { FullProfile } from 'schala-core';
import { useRouter, Router } from 'vue-router';
import { comparePageStore } from '../stores/comparePageStore';
import { computed } from 'vue';
const $q = useQuasar();
const router: Router = useRouter();
const props = defineProps<{
    profile: FullProfile;
}>();
const triggerNegative = () =>
{
    $q.notify({
        type: 'negative',
        message: "You can't add more than 4 profiles to the compare tab",
    });
};
const triggerPositive = () =>
{
    $q.notify({
        type: 'positive',
        message: 'Action was succesful',
    });
};
// Methods
const getFullProfile = () => props.profile;


const redirectWebsite = () => 
{
    window.open(props.profile.url);
};
const affiliation = computed(() =>
    getFullProfile().basicProfile.affiliation?.reduce((acc: string, curr: string) => acc + ',' + curr),
);
const handleClickButton = async () =>
{
    if (comparePageStore().isBeingCompared(props.profile.basicProfile.id)) 
    {
        comparePageStore().removeProfile(props.profile.basicProfile.id);
        triggerPositive();
        router.push({ path: '/profile/compare' });
    }
    else if (comparePageStore().comparisonRepresentation.fullProfiles.length >= 4) 
    {
        triggerNegative();
        return;
    }
    else
    {
        await comparePageStore().addProfile(props.profile.basicProfile.id);
        triggerPositive();
        router.push({ path: '/profile/compare' });
    }
};
//const Website: string = getFullProfile().website;
</script>
<style lang="sass" scoped>
.my-content
  margin: 0 2px
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>
