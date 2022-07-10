import { Filter } from '../../filters';
import { Filterable } from '../../filters/Filterable';
import { BasicProfile } from '../profile/Profile';

export class SearchResultsModel implements Filterable<SearchResultsModel> {
    private _basicProfiles: Array<BasicProfile>;
    private _filters: Filter<number, SearchResultsModel>[];

    constructor(basicProfiles: Array<BasicProfile>) {
        this._basicProfiles = basicProfiles;
    }

    public deepCopy(): SearchResultsModel {
        const basicProfilesCopy: Array<BasicProfile> = new Array<BasicProfile>();
        this._basicProfiles.forEach((basicProfile: BasicProfile) => {
            basicProfilesCopy.push(
                new BasicProfile(
                    basicProfile.id,
                    basicProfile.name,
                    basicProfile.affiliation,
                    basicProfile.totalCitations,
                    basicProfile.paperCount,
                    basicProfile.pictureURL,
                ),
            );
        });
        return new SearchResultsModel(basicProfilesCopy);
    }

    public applyAllFilters(): void {
        return;
    }

    public get filters(): Filter<number, SearchResultsModel>[] {
        return this._filters;
    }
    public set filters(filters: Filter<number, SearchResultsModel>[]) {
        this._filters = filters;
    }

    public get basicProfiles(): Array<BasicProfile> {
        return this._basicProfiles;
    }

    public set basicProfiles(basicProfiles: Array<BasicProfile>) {
        this._basicProfiles = basicProfiles;
    }
    public get entries(): number {
        return this._basicProfiles.length;
    }
}
