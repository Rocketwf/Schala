import {
    SemanticScholarSource,
    SearchResultsPaginationFilter,
    WordsInTitleFilter,
    AffiliationFilter,
} from 'schala-core';
import { BasicProfile, SearchResultsModel } from 'schala-core';
import { defineStore } from 'pinia';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: '',
        maxPage: 0,
        searchResultsShowingModel: new SearchResultsModel(new Array<BasicProfile>()),
        searchResultsCachedModel: new SearchResultsModel(new Array<BasicProfile>()),
        paginationFilter: new SearchResultsPaginationFilter(1, 15),
        affilationFilter: new AffiliationFilter(''),
        wordsInTitleFilter: new WordsInTitleFilter(''),
    }),
    getters: {
        getSearchResultsShowingModel: (state) => state.searchResultsShowingModel as SearchResultsModel,
    },
    actions: {
        setAffiliationFilter(affiliationFilter: string): void {
            this.affilationFilter.value = affiliationFilter;

            this.applyAllFilters();
        },
        setWordsInTitleFilter(wordsInTitleFilter: string): void {
            this.wordsInTitleFilter.value = wordsInTitleFilter;
            this.paginationFilter.value = 1;

            this.applyAllFilters();
        },
        async setSearchString(passedSearchString: string) {
            this.searchString = passedSearchString;
            const basicProfiles: BasicProfile[] = await SemanticScholarSource.getInstance().fetchSearchResults(
                passedSearchString,
            );
            this.searchResultsCachedModel.basicProfiles = basicProfiles;
            this.searchResultsShowingModel = this.searchResultsCachedModel.deepCopy();

            this.fixNumberOfPages();

            this.setPaginationFilter(1);

            this.applyAllFilters();
        },
        fixNumberOfPages(): void {
            this.maxPage = Math.ceil(this.searchResultsShowingModel.basicProfiles.length / 15);
        },
        setPaginationFilter(value: number): void {
            this.paginationFilter.value = value;

            this.applyAllFilters();
        },
        setSearchResultsShowingModel(model: SearchResultsModel) {
            this.searchResultsShowingModel = model;
        },
        setSearchResultsCachedModel(model: SearchResultsModel) {
            this.searchResultsCachedModel = model;
        },
        resetFromCache(): void {
            this.searchResultsShowingModel = this.searchResultsCachedModel.deepCopy();
        },
        applyAllFilters(): void {
            this.resetFromCache();
            this.wordsInTitleFilter.apply(this.getSearchResultsShowingModel);

            //
            // Fix the number of pages before you run the pagination filter
            this.fixNumberOfPages();
            this.paginationFilter.apply(this.getSearchResultsShowingModel);
        },
    },
});
