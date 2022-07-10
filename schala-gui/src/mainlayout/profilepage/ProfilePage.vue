<template>
    <div v-if="mount" class="row justify-center bg-transparent">
        <div class="col-md-12 col-xs-12 self-center">
            <profile-summary v-if="getFullProfile()" :profile="(getFullProfile() as FullProfile)" />
        </div>
    </div>
    <profile-content :profile-repr="(getProfilePageStore().profileRepresentation as ProfileRepresentation)" />
</template>
<script setup lang="ts">
import { profilePageStore } from '../../stores/profilePageStore';
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import ProfileContent from './ProfileContent.vue';
import { FullProfile, ProfileRepresentation } from 'schala-core';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const router = useRouter();
const $q = useQuasar();
ProfileRepresentation;
FullProfile;

const profileStore = profilePageStore();

const getProfilePageStore = () => {
    return profileStore;
};

const getFullProfile = () => {
    return getProfilePageStore().profileRepresentation.fullProfile as FullProfile;
};
const mount = ref(false);
onBeforeMount(() => {
    if (!profileStore.profileId) {
        $q.notify({
            type: 'negative',
            message: 'Please open a profile first'
        });
        router.push({ path: '/profile/search' });
    } else {
        mount.value = true;
        profileStore.renderSaved();
    }
});
</script>
