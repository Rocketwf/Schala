import { Filter } from '../../filters';
import { Filterable } from '../../filters/Filterable';
import { BasicProfile } from '../profile/Profile';

export class SearchResultsModel implements Filterable<SearchResultsModel> {
    private _basicProfiles: Array<BasicProfile>;
    filters: Filter<number, SearchResultsModel>[];

    constructor(basicProfiles: Array<BasicProfile>) {
        this._basicProfiles = basicProfiles;
    }

    deepCopy(): SearchResultsModel {
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

    applyAllFilters(): void {
        return;
    }

    public get basicProfiles(): Array<BasicProfile> {
        return this._basicProfiles;
    }

    public set basicProfiles(basicProfiles: Array<BasicProfile>) {
        this._basicProfiles = basicProfiles;
    }
}
