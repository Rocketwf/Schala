import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = model.basicProfiles.filter((profile: BasicProfile) => {
            return this.affiliationContainsSubstring(profile.affiliation, this.value).length !== 0;
        });
        model.basicProfiles = filtered;
    }

    private affiliationContainsSubstring(affiliations: Array<string>, substring: string): Array<string> {
        return affiliations.filter((element: string) => {
            if (element.indexOf(substring) !== -1) {
                return true;
            }
        });
    }
}

export class SearchResultsPaginationFilter extends SearchResultsFilter<number> {
    private _hitsPerPage: number = 15;

    constructor(value: number) {
        super(value);
    }

    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    apply(model: SearchResultsModel): void {
        model.basicProfiles = model.basicProfiles.slice(
            (this.value - 1) * this._hitsPerPage,
            (this.value - 1) * this._hitsPerPage + this._hitsPerPage,
        );
    }
}
