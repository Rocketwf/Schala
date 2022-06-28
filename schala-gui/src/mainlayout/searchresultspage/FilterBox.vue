<template>
    <div id="filterBox">
        <q-form @submit="applyFilter" class="q-gutter-md">
            <q-input v-model="filterString" debounce="500" rounded outlined placeholder="Filter matching results">
                <template #append>
                    <q-icon name="filter_alt" />
                </template>
            </q-input>
        </q-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { searchResultsStore } from 'stores/searchResultsPageStore';

// Attributes
const filterString = ref('');

// Methods
const getFilterString = (): string => {
    return filterString.value;
};

const applyFilter = async () => {
    getSearchPageResultsStore().setWordsInTitleFilter(getFilterString());
    getSearchPageResultsStore().applyAllFilters();
};

const getSearchPageResultsStore = () => {
    return searchResultsStore();
};
</script>
