import { BasicProfile, SearchResultsFactory, SearchResultsModel} from 'schala-core';
import { defineStore } from 'pinia';
import { SearchResultsPaginationFilter } from 'schala-core';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: '',
        maxPage: 5,
        searchResultsFactory: new SearchResultsFactory(),
        searchResultsShowingModel: new SearchResultsModel(new Array<BasicProfile>()),
        searchResultsCachedModel: new SearchResultsModel(new Array<BasicProfile>()),
        paginationFilter: new SearchResultsPaginationFilter(1),
    }),
    getters:{
      getSearchResultsShowingModel: (state) => state.searchResultsShowingModel as SearchResultsModel,
    },
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
            this.setPaginationFilter(1);
            this.paginationFilter.apply(this.getSearchResultsShowingModel);
            if(Math.round(basicProfiles.length / 15) == 0){
              this.maxPage = 1
            } else{
              this.maxPage = Math.round(basicProfiles.length / 15);
            }
        },
        setPaginationFilter(value:number): void{
            this.paginationFilter.value = value;
            this.paginationFilter.hitsPerPage = 15;
            console.log( this.paginationFilter.value);
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
        // TODO: Implement applyAllFilters
        applyAllFilters(): void {
          this.resetFromCache();
          this.paginationFilter.apply(this.getSearchResultsShowingModel);
        },
    },
});
