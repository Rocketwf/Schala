import { Filter } from '../../filters';
import { ArticlesPaginationFilter } from '../../filters/articlesfilters/ArticlesFilter';
import { Paginable } from '../../filters/Filterable';
import { Article } from '../articles/Article';
import { PopupEditButton } from '../inputs';
import { SelectOptions } from '../inputs/Inputs';
import { SimpleCardModel, ViewName } from '../simplecardmodel';
import { Pagination } from '../viewmodels/Pagination';

export class ArticlesModel implements Paginable<ArticlesModel>, SimpleCardModel {
    private _id: string = 'a' + Math.random().toString(31);
    private _articles: Array<Article>;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    private _cachedModel: ArticlesModel;
    private _filters: Filter<string, ArticlesModel>[];

    private _popupButtons: PopupEditButton<ArticlesModel>[];

    private _selectOptions: SelectOptions<string, ArticlesModel>[];

    private _paginationFilter: ArticlesPaginationFilter;
    private _pagination: Pagination<ArticlesModel>;

    constructor(_articles: Array<Article>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._articles = _articles;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this.articles = this._articles;
    }

    persist(): void {
        this._cachedModel = this.deepCopy();
    }

    private persistOnce(): void {
        if (!this._cachedModel) {
            this.persist();
        }
    }

    public applyAllFilters(): void {
        this.persistOnce();

        this.articles = this._cachedModel.articles;
        for (const filter of this._filters) {
            filter.applyValidate(this);
        }
        this.fixMaxPages();

        this._pagination.currentPage = 1;
        this._paginationFilter.applyValidate(this);
    }
    public applyPaginationFilter(): void {
        this.persistOnce();

        this.articles = this._cachedModel.articles;
        for (const filter of this._filters) {
            filter.applyValidate(this);
        }
        this.fixMaxPages();

        this._paginationFilter.applyValidate(this);
    }
    public fixMaxPages(): void {
        this.pagination.maxPage = Math.ceil(this.entries / this._paginationFilter.hitsPerPage);
    }

    deepCopy(): ArticlesModel {
        const articlesCopy: Array<Article> = new Array<Article>();
        this._articles.forEach((article: Article) => {
            const art: Article = new Article(
                article.title,
                article.venue,
                article.publicationYear,
                article.citationCount,
                article.url,
                article.coAuthors,
                article.abstract,
            );
            articlesCopy.push(art);
        });
        return new ArticlesModel(articlesCopy, this.title, this.sub, this.viewName, this._colWidth);
    }

    public get articles(): Array<Article> {
        return this._articles;
    }

    public set articles(articles: Array<Article>) {
        this._articles = articles;
    }

    public get colWidth(): number {
        return this._colWidth;
    }

    public get title(): string {
        return this._title;
    }

    public get id(): string {
        return this._id;
    }

    public get sub(): string {
        return this._sub;
    }

    public get viewName(): ViewName {
        return this._viewName;
    }

    /**
     * Getter method of the filters to be applied.
     */
    public get popupButtons(): PopupEditButton<ArticlesModel>[] {
        return this._popupButtons;
    }

    /**
     * Setter method of the filters to be applied.
     */
    public set popupButtons(popupButtons: PopupEditButton<ArticlesModel>[]) {
        this._popupButtons = popupButtons;
    }

    public get filters(): Filter<string, ArticlesModel>[] {
        return this._filters;
    }

    public set filters(filters: Filter<string, ArticlesModel>[]) {
        this._filters = filters;
    }
    public get paginationFilter(): ArticlesPaginationFilter {
        return this._paginationFilter;
    }

    public set paginationFilter(paginationFilter: ArticlesPaginationFilter) {
        this._paginationFilter = paginationFilter;
    }
    public get pagination(): Pagination<ArticlesModel> {
        return this._pagination;
    }

    public set pagination(pagination: Pagination<ArticlesModel>) {
        this._pagination = pagination;
    }

    public get entries(): number {
        return this._articles.length;
    }

    public get selectOptions(): SelectOptions<string, ArticlesModel>[] {
        return this._selectOptions;
    }
    public set selectOptions(selectOptions: SelectOptions<string, ArticlesModel>[]) {
        this._selectOptions = selectOptions;
    }
    public updateHitsPerPage(value: number): void {
        this.paginationFilter.hitsPerPage = value;
        this.applyPaginationFilter();
    }
}
