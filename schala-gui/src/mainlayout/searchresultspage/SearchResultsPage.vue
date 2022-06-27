<template>
    <div class="row justify-center">
        <div class="col-xs-12 col-md-8">
            <q-page padding>         
              <!--  <filter-affiliation labelText="Filter affiliations" />           TODO:Filter Affiliation -->
              
              <q-list bordered class="rounded-borders q-mt-lg">
                  <q-item-label header>Matching profiles</q-item-label>
                  <search-results-item
                      v-for="pro in strippedArray"
                      :key="pro.id"
                      :profile="pro as BasicProfile"
                  />
              </q-list>
              <div class="q-pa-lg flex flex-center">
                  <!-- TODO: Pagination -->
              </div>
              <!-- </q-page> Add this after implementing main layout-->
            </q-page>
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';
import { BasicProfile } from 'schala-core';
import { computed } from 'vue';
BasicProfile;

const searchStore = searchResultsStore();
let affiliationFilter: string = '';
//const pagination = ... TODO: Add Pagination

const getSearchResultsPageStore = () => {
    return searchStore;
};

const handleAffiliationFilter = (data: string | number | null): void =>  {
    affiliationFilter = data as string;
    getSearchResultsPageStore().setAffiliationFilter(getAffiliationFilter());
}

const getAffiliationFilter = (): string =>  {
    return affiliationFilter;
}


const getBasicProfiles = () => {
  return searchStore.searchResultsShowingModel.basicProfiles;
}

const strippedArray = computed(()=>getBasicProfiles().slice(0, 10));

</script>
