<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-md-8">
        <!-- <q-page padding>          Add this after implementing main layout -->
        <!--  <filter-affiliation labelText="Filter affiliations" />           TODO:Filter Affiliation -->
         
        <q-list bordered class="rounded-borders q-mt-lg">
          <q-item-label header>Matching profiles</q-item-label>
                <search-results-item 
                    v-for="pro in getSearchResultsPageStore().getSearchResultsShowingModel()"
                    v-bind:key="pro.id"
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
import { ref } from 'vue'

import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';

const searchStore = searchResultsStore();
//const pagination = ... TODO: Add Pagination

function getSearchResultsPageStore() {
    return searchStore;
}

function handleAffiliationFilter(): void {
    //TODO: Implement Affiliation Filter
}

function getAffiliationFilter(): string {
    return 'a'; //TODO:
}

</script>