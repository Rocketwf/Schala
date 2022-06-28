<template>
  <div class="q-pa-lg flex flex-center" @click="switchPage">
    <q-pagination v-model="currentPage" :max="getSearchResultsPageStore().maxPage" :max-pages="5" boundary-links />
  </div>

</template>
<script setup charset="utf-8" lang="ts">
import { searchResultsStore } from '../stores/searchResultsPageStore';
import { ref } from 'vue';

const getSearchResultsPageStore = () => {
    return searchStore;
};

const getStartingPage = (): number => {
  return getSearchResultsPageStore().paginationFilter.value;
};

const searchStore = searchResultsStore();
const currentPage = ref(getStartingPage());

const getCurrentPage = (): number => {
  return currentPage.value;
};


const switchPage = (): void => {
  getSearchResultsPageStore().setPaginationFilter(getCurrentPage());
}

</script>
