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
import { searchResultsStore } from '../../stores/searchResultsPageStore';


// Attributes
const filterString = ref(searchResultsStore().searchResultsModel.filters[0].value);

// Methods
const getFilterString = (): string => 
{
    return filterString.value;
};

const handleFilter = () => 
{
    searchResultsStore().setWordsInTitleFilter(getFilterString());
};
const removeFilter = () => 
{
    filterString.value = '';
    handleFilter();
};
</script>

