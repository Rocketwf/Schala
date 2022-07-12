<template>
  <div
    class="flex flex-center"
    @click="switchPage"
  >
    <q-pagination
      v-for="pagination of [paginationModel]"
      :key="pagination.currentPage + Math.random().toString(22)"
      v-model="pagination.currentPage"
      :max="paginationModel.maxPage"
      :max-pages="5"
      boundary-links
    />
  </div>
</template>
<script setup charset="utf-8" lang="ts">
import { ArticlesModel, Pagination } from 'schala-core';
const props = defineProps<{
    paginationModel: Pagination<ArticlesModel>;
}>();


const switchPage = () => 
{
    props.paginationModel.handleSwitch();
};
</script>