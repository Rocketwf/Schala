import { BasicProfile, SearchResultsFactory, SearchResultsModel } from 'schala-core';
import { defineStore } from 'pinia';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: '',
        searchResultsFactory: new SearchResultsFactory(),
        searchResultsShowingModel: {} as SearchResultsModel,
        searchResultsCachedModel: new SearchResultsModel(new Array<BasicProfile>()),
    }),
    actions: {
        getSearchString(): string {
            return this.searchString;
        },
        // TODO: Fix setSearchString after SearchResultsModel and deepCopy are implemented
        async setSearchString(passedSearchString: string) {
            this.searchString = passedSearchString;
            await this.searchResultsFactory
                .build(this.searchString)
                .then((basicProfiles: BasicProfile[]) => {
                      console.log(basicProfiles.length);
                    this.searchResultsCachedModel.basicProfiles = basicProfiles;
                    console.log(this.searchResultsCachedModel.basicProfiles);
                });
        },
        setSearchResultsShowingModel(model: SearchResultsModel) {
            this.searchResultsShowingModel = model;
        },
        setSearchResultsCachedModel(model: SearchResultsModel) {
            this.searchResultsCachedModel = model;
        },
        // TODO: Implement resetFromCache
        resetFromCache(): void {
            return;
        },
        // TODO: Implement applyAllFilters
        applyAllFilters(): void {
            return;
        },
    },
});
