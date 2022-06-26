import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const toFilter: Array<BasicProfile> = model.profiles;
        const filtered: Array<BasicProfile> = toFilter.filter((profile: BasicProfile) => {
            if (this.contains(profile.affiliation, this.value).length !== 0) {
                return true;
            }
        });
        model.profiles = filtered;
    }

    private contains(array: Array<string>, value: string): Array<string> {
        return array.filter((element: string) => {
            if (element.indexOf(value) !== -1) {
                return true;
            }
        });
    }
}
