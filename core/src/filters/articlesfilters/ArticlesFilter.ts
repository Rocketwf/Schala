import { Article, ArticleCoAuthor, ArticlesModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ArticlesFilter<S> extends Filter<S, ArticlesModel> {}

export class ArticlesPaginationFilter extends ArticlesFilter<number> {
    validate(model: ArticlesModel): boolean {
        return true;
    }
    /**
     *  Integer representing the number of articles per page.
     */
    private _hitsPerPage: number = 10;

    constructor(value: number) {
        super(value);
    }

    /**
     * Setter method of the hitsPerPage attribute.
     */
    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    public get hitsPerPage(): number {
        return this._hitsPerPage;
    }

    apply(model: ArticlesModel): void {
        model.articles = model.articles.slice(
            (this.value - 1) * this._hitsPerPage,
            (this.value - 1) * this._hitsPerPage + this._hitsPerPage,
        );
    }
}

/*export class SortByFilter extends ArticlesFilter<string> {
    constructor(value: string) {
        super(value);
    }
    apply(model: ArticlesModel): void {
       const newArticles: Article[] = model.articles.sort((n1: Article, n2: Article) => {
            if (this.value == 'year') {
                if (n1.year < n2.year) {
                    return 1;
                }
                if (n1.year > n2.year) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'citations') {
                if (n1.getCitationCount() < n2.getCitationCount()) {
                    return 1;
                }
                if (n1.getCitationCount() > n2.getCitationCount()) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'self-citations') {
                if (n1.getSelfCitations() < n2.getSelfCitations()) {
                    return 1;
                }
                if (n1.getSelfCitations() > n2.getSelfCitations()) {
                    return -1;
                }
                return 0;
            }
        });
        model.articles = newArticles;
    }
}*/

export class CoauthorsFilter extends ArticlesFilter<string> {
    constructor(value: string) {
        super(value);
    }

    validate(model: ArticlesModel): boolean {
        return true;
    }

    apply(model: ArticlesModel): void {
        let newArticles: Article[] = model.articles;
        for (const x of this.value.toLowerCase().split(',')) {
            newArticles = newArticles.filter((article: Article) => this.contains(article.coAuthors, x));
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if a string includes given substrings.
     */
    private contains(coAuthors: ArticleCoAuthor[], name: string): boolean {
        for (const coAuthor of coAuthors) {
            if (coAuthor.name.toLowerCase().indexOf(name) >= 0) {
                return true;
            }
        }
        return false;
    }
}

export class WordsInArticleTitleFilter extends ArticlesFilter<string> {
    constructor(value: string) {
        super(value);
    }

    validate(model: ArticlesModel): boolean {
        return true;
    }

    apply(model: ArticlesModel): void {
        let newArticles: Article[] = model.articles;
        for (const x of this.value.toLowerCase().split(',')) {
            newArticles = newArticles.filter((article: Article) => this.contains(article, x));
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if a string includes given substrings.
     */
    private contains(article: Article, word: string): boolean {
        if (article.title.toLowerCase().indexOf(word) >= 0) {
            return true;
        }
        return false;
    }
}

export class NumberOfCitationsFilter extends ArticlesFilter<string> {
    constructor(value: string) {
        super(value);
    }

    validate(model: ArticlesModel): boolean {
        return true;
    }
    apply(model: ArticlesModel): void {
        const newArticles: Article[] = model.articles.filter(
            (article: Article) => article.citationCount >= +this.value,
        );
        model.articles = newArticles;
    }
}

export class KeywordsFilter extends ArticlesFilter<string> {
    constructor(value: string) {
        super(value);
    }

    validate(model: ArticlesModel): boolean {
        return true;
    }

    apply(model: ArticlesModel): void {
        if (this.value === '') {
            return;
        }
        let newArticles: Article[] = model.articles;
        for (const x of this.value.toLowerCase().split(',')) {
            newArticles = newArticles.filter((article: Article) => {
                if (!article.abstract) {
                    return false;
                }
                const lowerCaseName: string = article.abstract.toLowerCase();
                return lowerCaseName.indexOf(x) >= 0;
            });
        }
        model.articles = newArticles;
    }
}
