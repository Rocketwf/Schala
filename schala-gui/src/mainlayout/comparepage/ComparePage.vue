<template>
    <div class="row justify-center bg-transparent" style="100%">
        <div
            :class="'col-md-' + getComparePageStore().comparisonRepresentation.getSummaryWidth() + ' col-xs-12 self-center'"
            v-for="profile of getComparePageStore().comparisonRepresentation.fullProfiles"
            :key="profile.basicProfile.id"
        >
            <!-- Template for the profile summary (upper part of the profile). -->
            <ProfileSummary :profile="(profile as FullProfile)" />
        </div>
    </div>
    <!--  Template for the content of the compare page.  -->
    <compare-content :comparison-repr="(getComparePageStore().comparisonRepresentation as ComparisonRepresentation)" />
</template>

<script setup lang="ts" charset="utf-8">
/**
 * Main component which illustrates the graphs of compared scholars.
 */
import ProfileSummary from '../../sharedcomponents/ProfileSummary.vue';
import CompareContent from './CompareContent.vue';
import { comparePageStore } from '../../stores/comparePageStore';
import { FullProfile, ComparisonRepresentation } from 'schala-core';
import { ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const router = useRouter();
/**
 * Store for the state of the compare page.
 */
FullProfile;
ComparisonRepresentation;
const compareStore = comparePageStore();

/**
 * Getter method for the ComparePageStore.
 */
const getComparePageStore = () => {
    return compareStore;
};
const mount = ref(false);
onBeforeMount(() => {
    if (compareStore.profileIds.length === 0) {
        $q.notify({
            type: 'negative',
            message: 'Add a profile to the compare page first'
        });
        router.push({ path: '/profile/search' });
    } else {
        mount.value = true;
        compareStore.renderSaved();
    }
});
</script>
