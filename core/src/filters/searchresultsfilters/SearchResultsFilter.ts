import { BasicProfile, SearchResultsModel } from '../../models';
import { Filter } from '../';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    /**
     * Applys search results filter on the given model
     * @param model - the given SearchResultsModel
     */
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    /**
     * It checks if the given model is valid
     * @param model - the given SearchResultsModel
     * @returns true if the given model is valid
     */
    validate(model: SearchResultsModel): boolean {
        model;
        return true;
    }
    /**
     * Applys affiliation filter on the given model
     * @param model - the given SearchResultsModel
     */
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = new Array<BasicProfile>();
        for (const bp of model.basicProfiles) {
            if (this.affiliationContainsSubstring(bp.affiliation, this._value).length !== 0) {
                filtered.push(bp);
            }
        }
        model.basicProfiles = filtered;
    }

    /**
     * Affiliations contains substring
     * @param affiliations - the affiliations of an author
     * @param substring - an affiliation or substring of an affiliation
     * @returns true if affiliations of an author contains the given affiliation or substring of the given affiliation
     */
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
    /**
     * Creates an instance of words in title filter.
     * @param value - value of the filter
     */
    constructor(value: string) {
        super(value);
    }
    /**
     * Applys words in title filter on the given model
     * @param model -the given SearchResultsModel
     */
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
    /**
     * It checks if the given model is valid
     * @param model - the given SearchResultsModel
     * @returns true if the given model is valid
     */
    validate(model: SearchResultsModel): boolean {
        model;
        return true;
    }
    /**
     *  Integer representing the number of articles per page.
     */
    private _hitsPerPage: number;
    /**
     * Creates an instance of search results pagination filter.
     * @param value - value of the filter
     * @param hitsPerPage - number of elements of a page
     */
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

    /**
     * Applys search results pagination filter on the given model
     * @param model - the given SearchResultsModel
     */
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
