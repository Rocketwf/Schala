import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const toFilter: Array<BasicProfile> = model.profiles;
        const filtered: Array<BasicProfile> = toFilter.filter((profile: BasicProfile) => {
            if (profile.affiliation.indexOf(this.value) !== -1) {
                return true;
            }
        });
        model.profiles = filtered;
    }
}
