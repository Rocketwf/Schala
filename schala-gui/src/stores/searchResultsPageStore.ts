import { BasicProfile, SearchResultsFactory, SearchResultsModel } from 'schala-core';
import { defineStore } from 'pinia';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: '',
        searchResultsFactory: new SearchResultsFactory(),
        searchResultsShowingModel: new SearchResultsModel(new Array<BasicProfile>()),
        searchResultsCachedModel: new SearchResultsModel(new Array<BasicProfile>()),
    }),
    actions: {
        getSearchString(): string {
            return this.searchString;
        },
        // TODO: Fix setSearchString after SearchResultsModel and deepCopy are implemented
        async setSearchString(passedSearchString: string) {
            this.searchString = passedSearchString;
            await this.searchResultsFactory.build(this.searchString).then((basicProfiles: BasicProfile[]) => {
                console.log(basicProfiles.length);
                console.log(basicProfiles);
                this.searchResultsCachedModel.basicProfiles = basicProfiles;
                this.searchResultsShowingModel = this.searchResultsCachedModel.deepCopy();
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
