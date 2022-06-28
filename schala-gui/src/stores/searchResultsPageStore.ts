import { BasicProfile, SearchResultsFactory, SearchResultsModel} from 'schala-core';
import { defineStore } from 'pinia';
import { SearchResultsPaginationFilter } from 'schala-core/dist/filters/searchresultsfilters/SearchResultsFilter';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: '',
        searchResultsFactory: new SearchResultsFactory(),
        searchResultsShowingModel: new SearchResultsModel(new Array<BasicProfile>()),
        searchResultsCachedModel: new SearchResultsModel(new Array<BasicProfile>()),
        paginationFilter: new SearchResultsPaginationFilter,
    }),
    actions: {
        setAffiliationFilter(affiliationFilter: string): void {
          affiliationFilter;
          return;
        },
        getSearchString(): string {
            return this.searchString;
        },
        // TODO: Fix setSearchString after SearchResultsModel and deepCopy are implemented
        async setSearchString(passedSearchString: string) {
            this.searchString = passedSearchString;
            const basicProfiles: BasicProfile [] = await this.searchResultsFactory.build(this.searchString)
            console.log(basicProfiles.length);
            console.log(basicProfiles);
            this.searchResultsCachedModel.basicProfiles = basicProfiles;
            this.searchResultsShowingModel = this.searchResultsCachedModel.deepCopy();

        },
        setPaginationFilter(value:number): void{
            this.paginationFilter.value = value;
            this.paginationFilter.hitsPerPage = 15;
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
