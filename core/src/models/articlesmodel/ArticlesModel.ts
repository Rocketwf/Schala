import { Filterable } from '../../filters';
import { Article } from '../articles/Article';
import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ArticlesModel implements Filterable<ArticlesModel>, SimpleCardModel {
    private _id: string = 'a' + Math.random().toString(31);
    private _articles: Array<Article>;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    constructor(_articles: Array<Article>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._articles = _articles;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
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
                    article.bibTex,
                    article.url,
                    article.venue,
                    article.authors,
                    article.citations,
                    article.references,
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
}
