import { Loading } from 'quasar';
import { useStorage } from '@vueuse/core';
import {
    SemanticScholarSource,
    SearchResultsPaginationFilter,
    WordsInTitleFilter,
} from 'schala-core';
import { BasicProfile, SearchResultsModel } from 'schala-core';
import { defineStore } from 'pinia';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: useStorage('searchString', ''),
        maxPage: 0,
        searchResultsModel: new SearchResultsModel(new Array<BasicProfile>(), new SearchResultsPaginationFilter(1, 15), [new WordsInTitleFilter('')]),
    }),
    getters: {
        getSearchResultsShowingModel: (state) => state.searchResultsModel as SearchResultsModel,
    },
    actions: {
        setWordsInTitleFilter(wordsInTitleFilter: string): void
        {
            this.searchResultsModel.filters[0].value = wordsInTitleFilter;
            this.searchResultsModel.paginationFilter.value = 1;

            this.searchResultsModel.applyAllFilters();
        },
        async setSearchString(passedSearchString: string)
        {
            Loading.show();
            this.searchResultsModel.filters[0].value = '';
            this.searchString = passedSearchString;
            let basicProfiles: BasicProfile[] = [];
            try
            {
                basicProfiles = await SemanticScholarSource.getInstance().fetchSearchResults(
                    passedSearchString,
                );
            }
            catch (error)
            {
                Loading.hide();
                return;
            }

            this.searchResultsModel.basicProfiles = basicProfiles;
            this.searchResultsModel.query = passedSearchString;

            this.searchResultsModel.paginationFilter.value = 1;

            this.searchResultsModel.applyAllFilters();
            Loading.hide();
        },
        setSearchResultsShowingModel(model: SearchResultsModel)
        {
            this.searchResultsModel = model;
        },
    },
});
