import { ArticlesPaginationFilter } from '../../filters/articlesfilters/ArticlesFilter';
import { Paginable } from '../../filters/Filterable';

export class Pagination<S extends Paginable<S>> {
    private _currentPage: number;
    private _maxPage: number;
    private _paginationFilter: ArticlesPaginationFilter;
    private _model: S;

    constructor(_paginationFilter: ArticlesPaginationFilter, _model: S) {
        this._paginationFilter = _paginationFilter;
        this._model = _model;

        this._currentPage = this._paginationFilter.value;
    }

    public get paginationFilter(): ArticlesPaginationFilter {
        return this._paginationFilter;
    }

    public set maxPage(maxPage: number) {
        this._maxPage = maxPage;
    }
    public get maxPage(): number {
        return this._maxPage;
    }
    public get currentPage(): number {
        return this._currentPage;
    }
    public set currentPage(curr: number) {
        this._currentPage = curr;
        this._paginationFilter.value = curr;
    }
    public get model(): S {
        return this._model;
    }
    public handleSwitch(): void {
        this._paginationFilter.value = this._currentPage;
        this._model.applyPaginationFilter();
    }
}
