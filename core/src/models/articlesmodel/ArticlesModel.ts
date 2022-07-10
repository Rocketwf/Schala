import { Filter } from '../../filters';
import { ArticlesPaginationFilter } from '../../filters/articlesfilters/ArticlesFilter';
import { Paginable } from '../../filters/Filterable';
import { Article } from '../articles/Article';
import { PopupEditButton } from '../inputs';
import { SelectOptions } from '../inputs/Inputs';
import { SimpleCardModel, ViewName } from '../simplecardmodel';
import { Pagination } from '../viewmodels/Pagination';

export class ArticlesModel implements Paginable<ArticlesModel>, SimpleCardModel {
    /**
     * Represents the id value as a string
     */
    private _id: string = 'a' + Math.random().toString(31);
    /**
     * Represents the articles value as a Article array
     */
    private _articles: Array<Article>;
    /**
     * Represents the colWidth value as a number
     */
    private _colWidth: number;
    /**
     * Represents the title value as a string
     */
    private _title: string;
    /**
     * Represents the sub title value as a string
     */
    private _sub: string;
    /**
     * Represents the viewName as a ViewName
     */
    private _viewName: ViewName;
    /**
     * Represents the cachedModel value as a ArticlesModel
     */
    private _cachedModel: ArticlesModel;
    /**
     * Represents the filters as a Filter array
     */
    private _filters: Filter<string, ArticlesModel>[];
    /**
     * Represents the buttons as a PopupEditButton array
     */
    private _popupButtons: PopupEditButton<ArticlesModel>[];
    /**
     * Represents the options as a SelectOptions array
     */
    private _selectOptions: SelectOptions<string, ArticlesModel>[];
    /**
     * Represents the paginationFilter as a ArticlesPaginationFilter
     */
    private _paginationFilter: ArticlesPaginationFilter;
    /**
     * Represents the pagination as a Pagination
     */
    private _pagination: Pagination<ArticlesModel>;

    /**
     * Creates an instance of articles model.
     * @param _articles - Represents the articles value as a Article array
     * @param _title - Represents the title value as a string
     * @param _sub - Represents the sub title value as a string
     * @param _viewName - Represents the viewName as a ViewName
     * @param _colWidth - Represents the colWidth value as a number
     */
    constructor(_articles: Array<Article>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._articles = _articles;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this.articles = this._articles;
    }

    /**
     * Save copy of model to the cacheModel
     */
    persist(): void {
        this._cachedModel = this.deepCopy();
    }

    /**
     * If the cachedModel is null, call persist method
     */
    private persistOnce(): void {
        if (!this._cachedModel) {
            this.persist();
        }
    }

    /**
     * Applies all filters on the model
     */
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
    /**
     * Applies all pagination filters on the model
     */
    public applyPaginationFilter(): void {
        this.persistOnce();

        this.articles = this._cachedModel.articles;
        for (const filter of this._filters) {
            filter.applyValidate(this);
        }
        this.fixMaxPages();

        this._paginationFilter.applyValidate(this);
    }
    /**
     * Fix the max amount of pages
     */
    public fixMaxPages(): void {
        this.pagination.maxPage = Math.ceil(this.entries / this._paginationFilter.hitsPerPage);
    }

    /**
     * Creates a copy of the model
     * @returns copy of the model as a ArticlesModel
     */
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

    /**
     * Getter method of the articles attribute
     */
    public get articles(): Array<Article> {
        return this._articles;
    }
    /**
     * Setter method of the articles attribute
     */
    public set articles(articles: Array<Article>) {
        this._articles = articles;
    }
    /**
     * Getter method of the colWidth attribute
     */
    public get colWidth(): number {
        return this._colWidth;
    }
    /**
     * Setter method of the colWidth attribute
     */
    public set colWidth(v: number) {
        this._colWidth = v;
    }
    /**
     * Getter method of the title attribute
     */
    public get title(): string {
        return this._title;
    }
    /**
     * Setter method of the title attribute
     */
    public set title(v: string) {
        this._title = v;
    }
    /**
     * Getter method of the id attribute
     */
    public get id(): string {
        return this._id;
    }
    /**
     * Setter method of the id attribute
     */
    public set id(v: string) {
        this._id = v;
    }
    /**
     * Getter method of the sub attribute
     */
    public get sub(): string {
        return this._sub;
    }
    /**
     * Setter method of the sub attribute
     */
    public set sub(v: string) {
        this._sub = v;
    }
    /**
     * Getter method of the viewName attribute
     */
    public get viewName(): ViewName {
        return this._viewName;
    }
    /**
     * Setter method of the viewName attribute
     */
    public set viewName(v: ViewName) {
        this._viewName = v;
    }

    /**
     * Getter method of the popupButtons attribute.
     */
    public get popupButtons(): PopupEditButton<ArticlesModel>[] {
        return this._popupButtons;
    }

    /**
     * Setter method of the popupButtons attribute.
     */
    public set popupButtons(popupButtons: PopupEditButton<ArticlesModel>[]) {
        this._popupButtons = popupButtons;
    }
    /**
     * Getter method of the filters to be applied.
     */
    public get filters(): Filter<string, ArticlesModel>[] {
        return this._filters;
    }
    /**
     * Setter method of the filters to be applied.
     */
    public set filters(filters: Filter<string, ArticlesModel>[]) {
        this._filters = filters;
    }
    /**
     * Getter method of the pagination filters to be applied.
     */
    public get paginationFilter(): ArticlesPaginationFilter {
        return this._paginationFilter;
    }
    /**
     * Setter method of the pagination filters to be applied.
     */
    public set paginationFilter(paginationFilter: ArticlesPaginationFilter) {
        this._paginationFilter = paginationFilter;
    }
    /**
     * Getter method of the pagination attribute.
     */
    public get pagination(): Pagination<ArticlesModel> {
        return this._pagination;
    }
    /**
     * Setter method of the pagination attribute.
     */
    public set pagination(pagination: Pagination<ArticlesModel>) {
        this._pagination = pagination;
    }
    /**
     * Getter method of the entries attribute.
     */
    public get entries(): number {
        return this._articles.length;
    }
    /**
     * Getter method of the selectOptions attribute.
     */
    public get selectOptions(): SelectOptions<string, ArticlesModel>[] {
        return this._selectOptions;
    }
    /**
     * Setter method of the selectOptions attribute.
     */
    public set selectOptions(selectOptions: SelectOptions<string, ArticlesModel>[]) {
        this._selectOptions = selectOptions;
    }
    /**
     * Updates hits per page
     * @param value - element number of a page
     */
    public updateHitsPerPage(value: number): void {
        this.paginationFilter.hitsPerPage = value;
        this.applyPaginationFilter();
    }
}
