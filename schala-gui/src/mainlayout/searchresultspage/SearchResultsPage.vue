<template>
  <div
    v-if="mount"
    class="row justify-center"
  >
    <div class="col-xs-12 col-md-8">
      <q-page padding>
        <filter-box />
        <div class="q-pa-md">
          <div class="q-gutter-sm">
            <q-checkbox
              v-for="sfos in (searchStore.searchResultsModel.relatedFieldsOfStudy as SearchFieldsOfStudy[])"
              :key="sfos.fieldOfStudy"
              v-model="sfos.isActive"
              :label="sfos.fieldOfStudy"
              @update:model-value="handleFilter"
            />
          </div>
        </div>
        <q-list
          bordered
          class="rounded-borders q-mt-lg"
        >
          <q-item-label header>
            Matching profiles
          </q-item-label>
          <search-results-item
            v-for="pro in getBasicProfiles()"
            :key="pro.id"
            :profile="pro as BasicProfile"
          />
        </q-list>
        <div class="q-pa-lg flex flex-center">
          <generic-pagination
            :pagination-model="(searchStore.searchResultsModel.pagination as Pagination<SearchResultsModel|ArticlesModel>)"
          />
        </div>
      </q-page>
    </div>
  </div>
</template>
<script setup charset="utf-8" lang="ts">
import FilterBox from './FilterBox.vue';
import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';
import { Pagination, SearchResultsModel, SearchFieldsOfStudy, ArticlesModel, BasicProfile } from 'schala-core';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import GenericPagination from 'src/sharedcomponents/GenericPagination.vue';
BasicProfile;
Pagination;
SearchResultsModel;
ArticlesModel;
const router = useRouter();
const $q = useQuasar();

const searchStore = searchResultsStore();

const getSearchResultsPageStore = () => 
{
    return searchStore;
};

const getBasicProfiles = () => 
{
    return getSearchResultsPageStore().searchResultsModel.basicProfiles;
};

const mount = ref(false);
onBeforeMount(async () => 
{
    if (!searchStore.searchString) 
    {
        $q.notify({
            type: 'negative',
            message: 'Please enter a search query',
        });
        router.push({ path: '/' });
    }
    else 
    {
        mount.value = true;
        await searchStore.setSearchString(searchStore.searchString);
    }
});
const handleFilter = () => 
{
    searchStore.updateFieldsOfStudy();
};
</script>
