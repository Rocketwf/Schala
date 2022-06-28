import { Filter, Filterable } from '../../filters';
import { Article } from '../articles/Article';
import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ArticlesModel implements Filterable<ArticlesModel>, SimpleCardModel {
    private _id: string;
    private _articles: Array<Article>;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    constructor(articles: Array<Article>) {
        this._articles = articles;
    }

    applyAllFilters(): void {
        //filter.apply(this);
    }

    deepCopy(): ArticlesModel {
        const articlesCopy: Array<Article> = new Array<Article>();
        this._articles.forEach((article: Article) => {
            articlesCopy.push(
                new Article(
                    article.id,
                    article.title,
                    article.year,
                    article.citation,
                    article.selfCitation,
                    article.bibTex,
                    article.url,
                    article.venue,
                    article.coAuthors,
                ),
            );
        });
        return new ArticlesModel(articlesCopy);
    }

    public get articles(): Array<Article> {
        return this._articles;
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
}
