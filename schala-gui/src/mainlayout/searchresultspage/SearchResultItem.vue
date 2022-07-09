<template>
    <q-item clickable :class="inComparison ? 'bg-accent' : ''">
        <q-item-section top class="q-ml-sm" @click="handleClick">
            <q-item-label class="q-mt-sm">{{ getBasicProfile().name }}</q-item-label>
            <q-item-label caption lines="2"> Published {{ getBasicProfile().paperCount }} papers </q-item-label>
            <q-item-label caption lines="2"> Cited by {{ getBasicProfile().totalCitations }} </q-item-label>
        </q-item-section>

        <q-item-section top side>
            <div class="text-grey-8">
                <q-btn size="12px" flat dense class="bg-red" v-if="inComparison" icon="remove" @click="handleAdd" />
                <q-btn size="12px" flat dense class="bg-accent" v-else icon="add" @click="handleAdd" />
            </div>
        </q-item-section>
    </q-item>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { comparePageStore } from '../../stores/comparePageStore';
import { profilePageStore } from '../../stores/profilePageStore';
import { BasicProfile } from 'schala-core';
import { useQuasar } from 'quasar';

const props = defineProps<{
    profile: BasicProfile;
}>();

const router = useRouter();
const $q = useQuasar();

const profileStore = profilePageStore();
const compareStore = comparePageStore();

const inComparison = computed(() => {
    return compareStore.isBeingCompared(props.profile.id);
});

const triggerNegative = () => {
    $q.notify({
        type: 'negative',
        message: "You can't add more than 4 profiles to the compare tab",
    });
};
const triggerPositive = () => {
    $q.notify({
        type: 'positive',
        message: 'Action was succesful',
    });
};

const handleAdd = async () => {
    if (compareStore.isBeingCompared(props.profile.id)) {
        getComparePageStore().removeProfile(props.profile.id);
        triggerPositive();
    } else if (compareStore.comparisonRepresentation.fullProfiles.length >= 4) {
        triggerNegative();
        return;
    } else {
        await getComparePageStore().addProfile(props.profile.id);
        triggerPositive();
    }
};

const handleClick = async () => {
    await getProfileStore().setProfileId(props.profile.id);
    router.push({ path: '/profile/show' });
};

const getBasicProfile = (): BasicProfile => {
    return props.profile;
};

const getComparePageStore = () => {
    return compareStore;
};

const getProfileStore = () => {
    return profileStore;
};
</script>
