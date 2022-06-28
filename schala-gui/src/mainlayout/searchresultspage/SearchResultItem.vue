<template>
    <q-item clickable :class="inComparison ? 'bg-accent' : ''">
        <q-item-section top class="q-ml-sm" @click="handleClick">
            <q-item-label class= "q-mt-sm">{{ getBasicProfile().name }} </q-item-label>
            <q-item-label caption lines="2"> @{{ getBasicProfile().affiliation }} </q-item-label>
            <q-item-label caption lines="2"> 4  papers </q-item-label>
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

const props = defineProps<{
    profile: BasicProfile;
}>();

const router = useRouter();

const profileStore = profilePageStore();
const compareStore = comparePageStore();

const inComparison = computed(() => {
    return compareStore.isBeingCompared(props.profile.id);
});

const handleAdd = async () => {
    if (compareStore.isBeingCompared(props.profile.id)) {
        getComparePageStore().removeProfile(props.profile.id);
    } else {
        await getComparePageStore().addProfile(props.profile.id);
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
