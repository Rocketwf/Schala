import { defineStore } from 'pinia';
import { BasicProfile } from '../../../core/models/profile/Profile';

export const searchResultsStore = defineStore('searchResultsPage', () => {

  function getSearchResultsShowingModel(): BasicProfile[] {
    const test: BasicProfile[] = [];
    const pp = new BasicProfile('Walter Fitzgerald Tichy', '31313131', 'Karlsruhe Institute of Technology', 123)
    test.push(pp)
    test.push(pp)
    test.push(pp)
    test.push(pp)
    test.push(pp)
    return test; //TODO: Implement this
  }

  return {
    getSearchResultsShowingModel
  }
});
