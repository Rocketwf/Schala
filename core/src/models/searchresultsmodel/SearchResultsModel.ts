import { Filterable } from '../../filters/Filterable'
import { BasicProfile } from "../profile/Profile";
export class SearchResultsModel implements Filterable<SearchResultsModel> {

  constructor(basicProfiles: Array<BasicProfile>) {

  }
  deepCopy(): SearchResultsModel {
    return {} as SearchResultsModel
  }
  applyAllFilters(): void {
    return
  }
}
