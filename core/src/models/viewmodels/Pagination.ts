import { Filter } from '../../filters';
import { Paginable } from '../../filters/Filterable';

export class Pagination<S extends Paginable<S>> 
{
    private _currentPage: number;
    private _maxPage: number;
    private _paginationFilter: Filter<number, S>;
    private _model: S;

    constructor(_paginationFilter: Filter<number, S>, _model: S) 
    {
        this._paginationFilter = _paginationFilter;
        this._model = _model;

        this._currentPage = this._paginationFilter.value || 1;
        this.maxPage = 0;
    }

    public set paginationFilter(v: Filter<number, S>) 
    {
        this._paginationFilter = v;
    }

    public get paginationFilter(): Filter<number, S>
    {
        return this._paginationFilter;
    }

    public set maxPage(maxPage: number) 
    {
        this._maxPage = maxPage;
    }
    public get maxPage(): number 
    {
        return this._maxPage;
    }

    public get currentPage(): number 
    {
        return this._currentPage;
    }
    public set currentPage(curr: number) 
    {
        this._currentPage = curr;
        this._paginationFilter.value = curr;
    }
    public get model(): S 
    {
        return this._model;
    }

    public set model(v: S) 
    {
        this._model = v;
    }

    public handleSwitch(): void 
    {
        this._paginationFilter.value = this._currentPage;
        this._model.applyPaginationFilter();
    }
}
