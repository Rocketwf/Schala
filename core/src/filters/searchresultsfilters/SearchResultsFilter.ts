import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    validate(model: SearchResultsModel): boolean {
        model;
        return true;
    }
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = new Array<BasicProfile>();
        for (const bp of model.basicProfiles) {
            if (this.affiliationContainsSubstring(bp.affiliation, this._value).length !== 0) {
                filtered.push(bp);
            }
        }
        model.basicProfiles = filtered;
    }

    private affiliationContainsSubstring(affiliations: Array<string>, substring: string): Array<string> {
        const filteredAffiliations: Array<string> = new Array<string>();
        for (const aff of affiliations) {
            if (aff.indexOf(substring) !== -1) {
                filteredAffiliations.push(aff);
            }
        }
        return filteredAffiliations;
    }
}

export class WordsInTitleFilter extends SearchResultsFilter<string> {
    constructor(value: string) {
        super(value);
    }
    apply(model: SearchResultsModel): void {
        const filteredBasicProfiles: Array<BasicProfile> = new Array<BasicProfile>();
        for (const bp of model.basicProfiles) {
            const lowerCaseValue: string = this.value.toLowerCase();
            const lowerCaseName: string = bp.name.toLowerCase();
            if (lowerCaseName.includes(lowerCaseValue)) {
                filteredBasicProfiles.push(bp);
            }
        }
        model.basicProfiles = filteredBasicProfiles;
    }
}
export class SearchResultsPaginationFilter extends SearchResultsFilter<number> {
    validate(model: SearchResultsModel): boolean {
        model;
        return true;
    }
    /**
     *  Integer representing the number of articles per page.
     */
    private _hitsPerPage: number;
    constructor(value: number, hitsPerPage: number) {
        super(value);
        this._hitsPerPage = hitsPerPage;
    }
    /**
     * Setter method of the hitsPerPage attribute.
     */
    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    apply(model: SearchResultsModel): void {
        const slicedBasicProfiles: BasicProfile[] = new Array<BasicProfile>();
        let start: number = (this.value - 1) * this._hitsPerPage;
        let end: number = (this.value - 1) * this._hitsPerPage + this._hitsPerPage;
        if (end >= model.basicProfiles.length) {
            end = model.basicProfiles.length;
        }
        for (start; start < end; ++start) {
            slicedBasicProfiles.push(model.basicProfiles[start]);
        }
        model.basicProfiles = slicedBasicProfiles;
    }
}
