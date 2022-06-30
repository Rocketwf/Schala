import { Article, ArticlesModel } from '../../models';
import { CoAuthor } from '../../models/articles/Article';
import { Filter } from '../Filter';

export abstract class ArticlesFilter<S> extends Filter<S, ArticlesModel> {
    abstract apply(model: ArticlesModel): void;
}

export class ArticlesPaginationFilter extends ArticlesFilter<number> {
    private _hitsPerPage: number = 10;

    constructor(value: number) {
        super(value);
    }

    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    apply(model: ArticlesModel): void {
        model.articles = model.articles.slice(
            (this.value - 1) * this._hitsPerPage,
            (this.value - 1) * this._hitsPerPage + this._hitsPerPage,
        );
    }
}

export class SortByFilter extends ArticlesFilter<string> {
    apply(model: ArticlesModel): void {
        const newArticles: Article[] = model.articles.sort((n1: Article, n2: Article) => {
            if (this.value == 'year') {
                if (n1.year > n2.year) {
                    return 1;
                }
                if (n1.year < n2.year) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'citations') {
                if (n1.citation > n2.citation) {
                    return 1;
                }
                if (n1.citation < n2.citation) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'self-citations') {
                if (n1.selfCitation > n2.selfCitation) {
                    return 1;
                }
                if (n1.selfCitation < n2.selfCitation) {
                    return -1;
                }
                return 0;
            }
        });
        model.articles = newArticles;
    }
}

export class CoauthorsFilter extends ArticlesFilter<string[]> {
    apply(model: ArticlesModel): void {
        let newArticles: Article[];
        for (const x of this.value) {
            newArticles = model.articles.filter((article: Article) => this.contains(article.coAuthors, x));
        }
        model.articles = newArticles;
    }

    private contains(coAuthors: CoAuthor[], name: string): boolean {
        for (const coAuthor of coAuthors) {
            if (coAuthor.name == name) {
                return true;
            }
        }
        return false;
    }
}
