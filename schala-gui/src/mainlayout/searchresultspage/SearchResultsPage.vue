<template>
    <div v-if="mount" class="row justify-center">
        <div class="col-xs-12 col-md-8">
            <q-page padding>
                <filter-box />
                <q-list bordered class="rounded-borders q-mt-lg">
                    <q-item-label header>Matching profiles</q-item-label>
                    <search-results-item
                        v-for="pro in getBasicProfiles()"
                        :key="pro.id"
                        :profile="pro as BasicProfile"
                    />
                </q-list>
                <div class="q-pa-lg flex flex-center">
                    <generic-pagination
                        :handle-switch="handleSwitch"
                        :max-value="getMaxPage()"
                        :current-page="getCurrentPage()"
                    />
                </div>
            </q-page>
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import FilterBox from './FilterBox.vue';
import GenericPagination from '../../sharedcomponents/GenericPagination.vue';
import { searchResultsStore } from '../../stores/searchResultsPageStore';
import SearchResultsItem from './SearchResultItem.vue';
import { BasicProfile } from 'schala-core';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
BasicProfile;
const router = useRouter();
const $q = useQuasar();

const searchStore = searchResultsStore();

const getSearchResultsPageStore = () => {
    return searchStore;
};

const getCurrentPage = () => {
    return getSearchResultsPageStore().paginationFilter.value;
};
const getMaxPage = () => {
    return getSearchResultsPageStore().maxPage;
};

const getBasicProfiles = () => {
    return getSearchResultsPageStore().searchResultsShowingModel.basicProfiles;
};

const handleSwitch = (value: number) => {
    getSearchResultsPageStore().setPaginationFilter(value);
};
const mount = ref(false);
onBeforeMount(async () => {
    if (!searchStore.searchString) {
        $q.notify({
            type: 'negative',
            message: 'Please enter a search query',
        });
        router.push({ path: '/' });
    }else {
        mount.value = true;
        await searchStore.setSearchString(searchStore.searchString);
    }
});
</script>
