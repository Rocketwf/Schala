import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = model.profiles.filter((profile: BasicProfile) => {
            return this.affiliationContainsSubstring(profile.affiliation, this.value).length !== 0;
        });
        model.profiles = filtered;
    }

    private affiliationContainsSubstring(affiliations: Array<string>, substring: string): Array<string> {
        return affiliations.filter((element: string) => {
            if (element.indexOf(substring) !== -1) {
                return true;
            }
        });
    }
}
