<template>
  <simple-card :simple-card-model="props.cardModel">
    <template #selectOptions>
      <select-options :select-options-models="cardModel.selectOptions" />
      <div class="col-md-2 col-xs-12 vertical-middle">
        <q-select
          standout
          v-model="hitsPerPage"
          :options="[10, 15, 20, 25, 30, 50]"
          label="Hits per page"
          @update:model-value="updateHitsPerPage"
        />
      </div>
    </template>
    <template #buttons>
      <popup-button
        v-for="popupBtn in cardModel.popupButtons"
        :key="popupBtn.id"
        :popup-button-model="popupBtn"
        badge
      />
    </template>
    <template #model>
      <article-item
        v-for="art in props.cardModel.articles"
        :key="art.title"
        :article="art"
      />
    </template>
    <template #pagination>
      <generic-pagination :pagination-model="cardModel.pagination" />
    </template>
  </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ref } from 'vue';
import { ArticlesModel } from 'schala-core';
import ArticleItem from '../../mainlayout/profilepage/ArticleItem.vue';
import SimpleCard from './SimpleCard.vue';
import PopupButton from '../buttons/popupedit/PopupButton.vue';
import GenericPagination from '../GenericPagination.vue';
import SelectOptions from '../buttons/SelectOptions.vue';

const props = defineProps<{
    cardModel: ArticlesModel;
}>();
const hitsPerPage = ref(props.cardModel.paginationFilter.hitsPerPage);
const updateHitsPerPage = () => 
{
    props.cardModel.updateHitsPerPage(hitsPerPage.value);
};
</script>
