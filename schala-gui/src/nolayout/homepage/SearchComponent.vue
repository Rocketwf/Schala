<template>
  <q-form
    @submit="handleSearch"
    class="q-gutter-md"
  >
    <div
      class="q-gutter-y-md col-2"
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
      <q-btn
        id="butn"
        label="Search"
        class="float-right"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { searchResultsStore } from 'stores/searchResultsPageStore';

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
