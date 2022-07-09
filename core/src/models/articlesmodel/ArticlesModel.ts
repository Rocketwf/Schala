import { Filter, Filterable } from '../../filters';
import { Article } from '../articles/Article';
import { PopupEditButton } from '../inputs';
import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ArticlesModel implements Filterable<ArticlesModel>, SimpleCardModel {
    private _id: string = 'a' + Math.random().toString(31);
    private _articles: Array<Article>;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    private _cachedModel: ArticlesModel;
    private _filters: Filter<string, ArticlesModel>[];
    private _popupButtons: PopupEditButton<ArticlesModel>[];

    constructor(_articles: Array<Article>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._articles = _articles;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this.articles = this._articles.slice(0, 10);
    }

    persist(): void {
        this._cachedModel = this.deepCopy();
    }

    private persistOnce(): void {
        if (!this._cachedModel) this.persist();
    }

    public applyAllFilters(): void {
        this.persistOnce();

        this.articles = this._cachedModel.articles;
        for (const filter of this._filters) {
            filter.applyValidate(this);
        }
    }

    deepCopy(): ArticlesModel {
        const articlesCopy: Array<Article> = new Array<Article>();
        this._articles.forEach((article: Article) => {
            articlesCopy.push(
                new Article(
                    article.title,
                    article.venue,
                    article.publicationYear,
                    article.citationCount,
                    article.url,
                    article.coAuthors,
                    article.abstract,
                ),
            );
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
}
