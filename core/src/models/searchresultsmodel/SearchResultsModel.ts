import { Filterable } from '../../filters/Filterable';
import { BasicProfile } from '../profile/Profile';

export class SearchResultsModel implements Filterable<SearchResultsModel> {
    private _profiles: Array<BasicProfile>;

    constructor(basicProfiles: Array<BasicProfile>) {
        this._profiles = basicProfiles;
    }

    deepCopy(): SearchResultsModel {
        return {} as SearchResultsModel;
    }

    applyAllFilters(): void {
        return;
    }

    public get profiles(): Array<BasicProfile> {
        return this._profiles;
    }

    public set profiles(basicProfiles: Array<BasicProfile>) {
        this._profiles = basicProfiles;
    }
}
