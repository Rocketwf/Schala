<template>
  <div id="searchBox">
    <q-form
      @submit="handleSearch"
      class="q-gutter-md"
    >
      <q-input
        v-model="searchString"
        debounce="500"
        filled
        placeholder="Search for a name or an ID"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn
          id="butn"
          label="Search"
          class="float-right"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { searchResultsStore } from '../../stores/searchResultsPageStore';

// Attributes
const searchString = ref('');
const router = useRouter();

// Methods
const getSearchString = (): string => 
{
    return searchString.value;
};

const handleSearch = async () => 
{
    await getSearchPageResultsStore().setSearchString(getSearchString());
    router.push({ path: '/profile/search' });
};

const getSearchPageResultsStore = () => 
{
    return searchResultsStore();
};
</script>
<style type="text/css" media="screen" scoped>
#butn {
    margin-top: 10px;
}
</style>
