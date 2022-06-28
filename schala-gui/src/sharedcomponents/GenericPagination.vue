<template>
  <div class="q-pa-lg flex flex-center" @click="switchPage">
    <q-pagination v-model="refCurrentPage" :max="getSearchResultsPageStore().maxPage" :max-pages="5" boundary-links />
  </div>

</template>
<script setup charset="utf-8" lang="ts">
import { searchResultsStore } from '../stores/searchResultsPageStore';
import { ref } from 'vue';


const searchStore = searchResultsStore();
let refCurrentPage = ref(1);

const getCurrentPage = (): number => {
  return refCurrentPage.value;
};

const getSearchResultsPageStore = () => {
    return searchStore;
};

const switchPage = (): void => {
  getSearchResultsPageStore().setPaginationFilter(getCurrentPage());
}

</script>
