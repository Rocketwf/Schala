<template>
    <q-item class="col-md-3 my-content">
        <q-item-section side>
            <q-avatar square style="width: 145px; height: 180px">
                <img
                    src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=23RPQBQAAAAJ&citpid=2"
                />
            </q-avatar>
            <q-item-label class="full-width self-center">
                <q-btn
                    @click="handleActionButton"
                    unelevated
                    label="Compare"
                    class="full-width no-box-shadow no-border-radius"
                />
            </q-item-label>
        </q-item-section>
        <q-item-section top>
            <q-item-label class="vertical-top text-weight-bold text-h6">{{ Name }}</q-item-label>
            <q-item-label caption>{{ ID }}</q-item-label>
            <q-item-label caption>{{ Affiliation }}</q-item-label>
            <q-item-label caption>{{ Hindex }}</q-item-label>
            <q-item-label caption>{{ HindexWithoutSelfCitations }} </q-item-label>
            <q-item-label caption>{{ Citations }}</q-item-label>
            <q-item-label caption>{{ I10Index }}</q-item-label>
            <q-item-label caption>{{ I10IndexWithoutSelfCitations }}</q-item-label>
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

const handleActionButton = (): void => {
    getComparePageStore().addProfile(ID);
};

// Attributes
const ID: string = getFullProfile().basicProfile.id;
const Name: string = getFullProfile().basicProfile.name;
const Affiliation: string[] = getFullProfile().basicProfile.affiliation;
const Hindex: number = getFullProfile().hIndex.hIndex;
const HindexWithoutSelfCitations: number = getFullProfile().hIndex.hIndexWithoutSelfCitations;
const Citations: number = getFullProfile().basicProfile.totalCitations;
const I10Index: number = getFullProfile().i10Index.i10Index;
const I10IndexWithoutSelfCitations: number = getFullProfile().i10Index.i10IndexWithoutSelfCitations;
</script>
>
