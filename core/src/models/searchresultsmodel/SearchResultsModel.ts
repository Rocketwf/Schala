import { Filter, SearchResultsPaginationFilter, StudyFieldsFilter } from '../../filters';
import { Filterable, Paginable } from '../../filters/Filterable';
import { Message, STATUS } from '../../misc/Message';
import { BasicProfile } from '../profile/Profile';
import { Pagination } from '../viewmodels/Pagination';

export class SearchFieldsOfStudy 
{
    private _fieldOfStudy: string;
    private _isActive: boolean;
    constructor(_fieldOfStudy: string) 
    {
        this._fieldOfStudy = _fieldOfStudy;
        this._isActive = true;
    }

    public get fieldOfStudy(): string 
    {
        return this._fieldOfStudy;
    }

    public set fieldOfStudy(newFieldOfStudy: string) 
    {
        this._fieldOfStudy = newFieldOfStudy;
    }
    public get isActive(): boolean 
    {
        return this._isActive;
    }

    public set isActive(newIsActive: boolean) 
    {
        this._isActive = newIsActive;
    }
    public toggle(): void 
    {
        this._isActive = !this._isActive;
    }
}
export class SearchResultsModel implements Filterable<SearchResultsModel>, Paginable<SearchResultsModel> 
{
    private _basicProfiles: Array<BasicProfile>;
    private _filters: Filter<string, SearchResultsModel>[];
    private _studyFieldsFilter: StudyFieldsFilter;

    private _paginationFilter: SearchResultsPaginationFilter;
    private _pagination: Pagination<SearchResultsModel>;

    private _expandable: boolean;
    private _isExpanded: boolean;

    private _cachedModel: SearchResultsModel;
    private _query: string;

    private _relatedFieldsOfStudy: SearchFieldsOfStudy[];

    constructor(
        basicProfiles: Array<BasicProfile>,
        paginationFilter?: SearchResultsPaginationFilter,
        studyFieldsFilter?: StudyFieldsFilter,
        filters?: Filter<string, SearchResultsModel>[],
    ) 
    {
        this._basicProfiles = basicProfiles;
        this._paginationFilter = paginationFilter;
        this._studyFieldsFilter = studyFieldsFilter;
        if (this._paginationFilter) 
        {
            this._pagination = new Pagination<SearchResultsModel>(this._paginationFilter, this);
        }
        this._filters = filters;
    }

    public get studyFieldsFilter(): StudyFieldsFilter 
    {
        return this._studyFieldsFilter;
    }
    public set studyFieldsFilter(newStudyFieldsFilter: StudyFieldsFilter) 
    {
        this._studyFieldsFilter = newStudyFieldsFilter;
    }

    public get relatedFieldsOfStudy(): SearchFieldsOfStudy[] 
    {
        return this._relatedFieldsOfStudy;
    }

    public set relatedFieldsOfStudy(newRelatedFieldsOfStudy: SearchFieldsOfStudy[]) 
    {
        this._relatedFieldsOfStudy = newRelatedFieldsOfStudy;
    }
    public get query(): string 
    {
        return this._query;
    }

    public set query(v: string) 
    {
        this._query = v;
        this.persist();
    }

    public get paginationFilter(): SearchResultsPaginationFilter 
    {
        return this._paginationFilter;
    }

    public set paginationFilter(v: SearchResultsPaginationFilter) 
    {
        this._paginationFilter = v;
    }

    public get pagination(): Pagination<SearchResultsModel> 
    {
        return this._pagination;
    }

    public set pagination(v: Pagination<SearchResultsModel>) 
    {
        this._pagination = v;
    }

    private persistOnce(): void 
    {
        if (!this._cachedModel) 
        {
            this.persist();
        }
    }
    public fixMaxPages(): void 
    {
        this.pagination.maxPage = Math.ceil(this.entries / this._paginationFilter.hitsPerPage);
    }
    public applyPaginationFilter(): void 
    {
        this.persistOnce();

        this._basicProfiles = this._cachedModel.basicProfiles;
        for (const filter of this._filters) 
        {
            filter.applyValidate(this);
        }
        this.studyFieldsFilter.applyValidate(this);
        this.fixMaxPages();

        this._paginationFilter.applyValidate(this);
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
                    basicProfile.expertise,
                ),
            );
        });
        return new SearchResultsModel(basicProfilesCopy);
    }

    public applyAllFilters(): Message[] 
    {
        this.persistOnce();

        this.basicProfiles = this._cachedModel.basicProfiles;
        for (const filter of this._filters) 
        {
            filter.applyValidate(this);
        }
        this.studyFieldsFilter.applyValidate(this);
        this.fixMaxPages();

        this._pagination.currentPage = 1;
        this._paginationFilter.applyValidate(this);
        return [new Message(STATUS.OK)];
    }

    public get filters(): Filter<string, SearchResultsModel>[] 
    {
        return this._filters;
    }
    public set filters(filters: Filter<string, SearchResultsModel>[]) 
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
    private persist(): void 
    {
        this._cachedModel = this.deepCopy();
    }
    public get entries(): number 
    {
        return this._basicProfiles.length;
    }
}
