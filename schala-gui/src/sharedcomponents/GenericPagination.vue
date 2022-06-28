<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="refCurrentPage" :max="60" :max-pages="5" boundary-links :to-fn="page => (switchPage)" />
  </div>

</template>
<script setup charset="utf-8" lang="ts">
import { searchResultsStore } from '../stores/searchResultsPageStore';
import { onMounted, ref } from 'vue';


const searchStore = searchResultsStore();
let refCurrentPage = ref(1);
let maxPage: number = searchStore.searchResultsCachedModel.basicProfiles.length / 15
let currentPage: number;



const getCurrentPage = (): number => {
  onMounted(() => {
   currentPage = refCurrentPage.value
    })
    return currentPage;
};

const getSearchResultsPageStore = () => {
    return searchStore;
};

const switchPage = (): void => {
  getSearchResultsPageStore().setPaginationFilter(getCurrentPage());

}

</script>
