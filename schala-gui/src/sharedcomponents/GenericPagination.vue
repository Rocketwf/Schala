<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="currentPage" :max="5" boundary-links />
  </div>

</template>
<script setup charset="utf-8" lang="ts">
import { searchResultsStore } from '../stores/searchResultsPageStore';

const searchStore = searchResultsStore();
let currentPage: number = 1;

const getCurrentPage = (): number => {
    return currentPage;
};

const getSearchResultsPageStore = () => {
    return searchStore;
};

//const switchPage = (): void => {}

</script>
