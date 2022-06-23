<template>
  <q-item clickable :class="inComparison ? 'bg-accent' : ''">

    <q-item-section top class="q-ml-sm">
      <q-item-label class="q-mt-sm" @click = "handleClick">
        {{getBasicProfile().id}}
      </q-item-label>
      <q-item-label caption lines="2">
        {{getBasicProfile().name}}
      </q-item-label>
      <q-item-label caption lines="2">
        @{{getBasicProfile().affiliation}}
      </q-item-label>
      <q-item-label caption lines="2">
        {{getBasicProfile().totalCitations}}
      </q-item-label>
    </q-item-section>


    <q-item-section top side>
      <div class="text-grey-8">
        <q-btn size="12px" flat dense class="bg-red" v-if="inComparison" icon="remove" @click="handleAdd"/>
        <q-btn size="12px" flat dense class="bg-accent" v-else icon="add" @click="handleAdd"/>
      </div>
    </q-item-section>
  </q-item>

</template>
<script setup lang ="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import {useQuasar} from 'quasar';
import { comparePageStore } from '../../stores/comparePageStore';
import { profilePageStore } from '../../stores/profilePageStore';
import { BasicProfile } from 'schala-core';

    const props = defineProps<{
        profile: BasicProfile
    }>()

    const $q = useQuasar()
    const router = useRouter()

    const profileStore = profilePageStore();
    const compareStore = comparePageStore();

    const inComparison = computed(() => {
        return compareStore.isBeingCompared(props.profile.id);
    });

    function handleAdd(): void {
        if (compareStore.isBeingCompared(props.profile.id)) {
            getComparePageStore().removeProfile(props.profile.id)
        } else {
            getComparePageStore().addProfile(props.profile.id)
        }
    }

    function handleClick(): void {
        getProfileStore().setProfileId(props.profile.id)
        router.push({ path: '/profile/show'});
    }

    function getBasicProfile(): BasicProfile {
        return props.profile
    }

    function getComparePageStore() {
        return compareStore
    }

    function getProfileStore() {
        return profileStore
    }
</script>
