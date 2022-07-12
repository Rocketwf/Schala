<template>
  <q-input
    rounded
    standout
    bottom-slots
    v-model="filterString"
    label="Filter Matching Profiles"
    @update:model-value="handleFilter"
  >
    <template #prepend>
      <q-icon name="school" />
    </template>
    <template #append>
      <q-icon
        name="close"
        @click="removeFilter"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { searchResultsStore } from 'stores/searchResultsPageStore';

const getSearchPageResultsStore = () => 
{
    return searchResultsStore();
};

// Attributes
const filterString = ref(getSearchPageResultsStore().wordsInTitleFilter.value);

// Methods
const getFilterString = (): string => 
{
    return filterString.value;
};

const handleFilter = () => 
{
    getSearchPageResultsStore().setWordsInTitleFilter(getFilterString());
    getSearchPageResultsStore().applyAllFilters();
};
const removeFilter = () => 
{
    filterString.value = '';
    handleFilter();
};
</script>

