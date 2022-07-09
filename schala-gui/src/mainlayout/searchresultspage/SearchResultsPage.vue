<template>
    <div class="row justify-center">
        <div class="col-xs-12 col-md-8">
            <q-page padding>
                <filter-box />
                <q-list bordered class="rounded-borders q-mt-lg">
                    <q-item-label header>Matching profiles</q-item-label>
                    <search-results-item
                        v-for="pro in getBasicProfiles()"
                        :key="pro.id"
                        :profile="pro as BasicProfile"
                    />
                </q-list>
                <div class="q-pa-lg flex flex-center">
                    <generic-pagination
                        :handle-switch="handleSwitch"
                        :max-value="getMaxPage()"
                        :current-page="getCurrentPage()"
                    />
                </div>
            </q-page>
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import FilterBox from './FilterBox.vue';
import GenericPagination from '../../sharedcomponents/GenericPagination.vue';
import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';
import { BasicProfile } from 'schala-core';
import { onMounted } from 'vue';
BasicProfile;

const searchStore = searchResultsStore();

const getSearchResultsPageStore = () => {
    return searchStore;
};

const getCurrentPage = () => {
    return getSearchResultsPageStore().paginationFilter.value;
};
const getMaxPage = () => {
    return getSearchResultsPageStore().maxPage;
};

const getBasicProfiles = () => {
    return getSearchResultsPageStore().searchResultsShowingModel.basicProfiles;
};

const handleSwitch = (value: number) => {
    getSearchResultsPageStore().setPaginationFilter(value);
};
onMounted(()=>{
  searchStore.setSearchString(searchStore.searchString);
})
</script>
