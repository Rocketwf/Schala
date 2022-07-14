import { Filter } from '../../filters';
import { Filterable } from '../../filters/Filterable';
import { Message } from '../../misc/Message';
import { BasicProfile } from '../profile/Profile';

export class SearchResultsModel implements Filterable<SearchResultsModel> 
{
    private _basicProfiles: Array<BasicProfile>;
    private _filters: Filter<number, SearchResultsModel>[];

    private _expandable: boolean;
    private _isExpanded: boolean;

    constructor(basicProfiles: Array<BasicProfile>) 
    {
        this._basicProfiles = basicProfiles;
    }

    public get expandable(): boolean 
    {
        return this._expandable;
    }
    public set expandable(v: boolean) 
    {
        this._expandable = v;
    }

    public get isExpanded(): boolean 
    {
        return this._isExpanded;
    }
    public set isExpanded(v: boolean) 
    {
        this._isExpanded = v;
    }
    saveFilters(): void 
    {
        return;
    }
    restoreFilters(): void 
    {
        return;
    }

    public deepCopy(): SearchResultsModel 
    {
        const basicProfilesCopy: Array<BasicProfile> = new Array<BasicProfile>();
        this._basicProfiles.forEach((basicProfile: BasicProfile) => 
        {
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

    public applyAllFilters(): Message[] 
    {
        return;
    }

    public get filters(): Filter<number, SearchResultsModel>[] 
    {
        return this._filters;
    }
    public set filters(filters: Filter<number, SearchResultsModel>[]) 
    {
        this._filters = filters;
    }

    public get basicProfiles(): Array<BasicProfile> 
    {
        return this._basicProfiles;
    }

    public set basicProfiles(basicProfiles: Array<BasicProfile>) 
    {
        this._basicProfiles = basicProfiles;
    }
    public get entries(): number 
    {
        return this._basicProfiles.length;
    }
}
