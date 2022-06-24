import { BasicProfile, SearchResultsFactory, SearchResultsModel } from 'schala-core';
import { defineStore } from 'pinia';

interface ISearchResultsPageStore {
    setSearchString: (passedSearchString: string) => void;
    getSearchString: () => string;
    getSearchResultsFactory: () => SearchResultsFactory;
    getSearchResultsShowingModel: () => SearchResultsModel;
    setSearchResultsShowingModel: (model: SearchResultsModel) => void;
    getSearchResultsCachedModel: () => SearchResultsModel;
    setSearchResultsCachedModel: (model: SearchResultsModel) => void;
    resetFromCache: () => void;
    applyAllFilters: () => void;
}
export const searchResultsStore = defineStore<string, ISearchResultsPageStore>('searchResultsPage', () => {
  let searchString = '';
  const searchResultsFactory:SearchResultsFactory = {} as SearchResultsFactory;
  let searchResultsShowingModel: SearchResultsModel = {} as SearchResultsModel;
  let searchResultsCachedModel: SearchResultsModel = {} as SearchResultsModel;

  function getSearchString(): string {
    return searchString;
  }
  // TODO: Fix setSearchString after SearchResultsModel and deepCopy are implemented
  function setSearchString(passedSearchString: string):void {
    searchString = passedSearchString;
    const profile: Array<BasicProfile> = getSearchResultsFactory().build(searchString);
    searchResultsCachedModel = new SearchResultsModel(profile);
    searchResultsShowingModel = searchResultsShowingModel.deepCopy();
  }
  function getSearchResultsFactory():SearchResultsFactory {
    return searchResultsFactory;
  }
  function getSearchResultsShowingModel():SearchResultsModel {
    return searchResultsShowingModel;
  }
  function setSearchResultsShowingModel(model: SearchResultsModel) {
    searchResultsShowingModel = model;
  }
  function getSearchResultsCachedModel():SearchResultsModel {
    return searchResultsCachedModel;
  }
  function setSearchResultsCachedModel(model: SearchResultsModel) {
    searchResultsCachedModel = model;
  }
  // TODO: Implement resetFromCache
  function resetFromCache(): void {
    return ;
  }
  // TODO: Implement applyAllFilters
  function applyAllFilters(): void {
    return ;
  }
  return {
    setSearchString,
    getSearchString,
    getSearchResultsFactory,
    getSearchResultsShowingModel,
    setSearchResultsShowingModel,
    getSearchResultsCachedModel,
    setSearchResultsCachedModel,
    resetFromCache,
    applyAllFilters
  }
});
