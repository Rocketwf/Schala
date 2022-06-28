import { Filter, Filterable } from '../../filters';
import { Article } from '../articles/Article';
import { SimpleCardModel } from '../simplecardmodel';

export class ArticlesModel implements Filterable<ArticlesModel>, SimpleCardModel {
    private _articles: Array<Article>;
    filters: Filter<object, ArticlesModel>[];
    colWidth: number;
    title: string;
    sub: string;

    constructor(articles: Array<Article>) {
        this._articles = articles;
    }

    applyAllFilters(): void {
        this.filters.forEach((filter: Filter<object, ArticlesModel>) => {
            filter.apply(this);
        });
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
}
