<template>
    <div class="row justify-center">
        <div class="col-xs-12 col-md-8">
            <!-- <q-page padding>          Add this after implementing main layout -->
            <q-input rounded standout bottom-slots v-model="affiliationFilter" label="Filter by Affiliation" :rules="[data => typeof data === 'string']" @update:model-value="handleAffiliationFilter">
                <template v-slot:prepend>
                    <q-icon name="school" />
                </template>
                <template v-slot:append>
                    <q-icon name="close" @click="affiliationFilter = ''" class="cursor-pointer" />
                </template>
            </q-input>

            <q-list bordered class="rounded-borders q-mt-lg">
                <q-item-label header>Matching profiles</q-item-label>
                <search-results-item
                    v-for="pro in getSearchResultsPageStore().getSearchResultsShowingModel()"
                    :key="pro.id"
                    :profile="pro"
                />
            </q-list>
            <div class="q-pa-lg flex flex-center">
                <!-- TODO: Pagination -->
            </div>
            <!-- </q-page> Add this after implementing main layout-->
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">

import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';

const searchStore = searchResultsStore();
let affiliationFilter: string = '';
//const pagination = ... TODO: Add Pagination

const getSearchResultsPageStore = () => {
    return searchStore;
}

const handleAffiliationFilter = (data: string | number | null): void =>  {
    affiliationFilter = data as string;
    getSearchResultsPageStore().setAffiliationFilter(getAffiliationFilter());
}

const getAffiliationFilter = (): string =>  {
    return affiliationFilter;
}
</script>
