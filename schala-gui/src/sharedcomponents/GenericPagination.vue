<template>
  <div
    class="flex flex-center"
    @click="switchPage"
  >
    <q-pagination
      v-for="pagination of [paginationModel]"
      :key="pagination + Math.random().toString()"
      v-model="pagination.currentPage"
      :max="paginationModel.maxPage"
      :max-pages="5"
      boundary-links
    />
  </div>
</template>
<script setup charset="utf-8" lang="ts">
import { ArticlesModel, Pagination, SearchResultsModel } from 'schala-core';
const props = defineProps<{
    paginationModel: Pagination<ArticlesModel | SearchResultsModel>;
}>();

const switchPage = () => 
{
    props.paginationModel.handleSwitch();
};
</script>
