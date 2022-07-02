import { Article, ArticlesModel } from '../../models';
import { Author } from '../../models/articles/Article';
import { Filter } from '../Filter';

export abstract class ArticlesFilter<S> extends Filter<S, ArticlesModel> {
    abstract apply(model: ArticlesModel): void;
}

export class ArticlesPaginationFilter extends ArticlesFilter<number> {
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

    apply(model: ArticlesModel): void {
        model.articles = model.articles.slice(
            (this.value - 1) * this._hitsPerPage,
            (this.value - 1) * this._hitsPerPage + this._hitsPerPage,
        );
    }
}

export class SortByFilter extends ArticlesFilter<string> {
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
                if (n1.citation < n2.citation) {
                    return 1;
                }
                if (n1.citation > n2.citation) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'self-citations') {
                if (n1.selfCitation < n2.selfCitation) {
                    return 1;
                }
                if (n1.selfCitation > n2.selfCitation) {
                    return -1;
                }
                return 0;
            }
        });
        model.articles = newArticles;
    }
}

export class CoauthorsFilter extends ArticlesFilter<string[]> {
    constructor(value: string[]) {
        super(value);
    }
    apply(model: ArticlesModel): void {
        let newArticles: Article[] = model.articles;
        for (const x of this.value) {
            newArticles = newArticles.filter((article: Article) => this.contains(article.authors, x));
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if a string includes given substrings.
     */
    private contains(coAuthors: Author[], name: string): boolean {
        for (const coAuthor of coAuthors) {
            if (name.indexOf(coAuthor.name) >= 0) {
                return true;
            }
        }
        return false;
    }
}

export class WordsInTitleFilter extends ArticlesFilter<string[]> {
    constructor(value: string[]) {
        super(value);
    }
    apply(model: ArticlesModel): void {
        let newArticles: Article[] = model.articles;
        for (const x of this.value) {
            newArticles = newArticles.filter((article: Article) => this.contains(article.title, x));
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if a string includes given substrings.
     */
    private contains(title: string, word: string): boolean {
        const splitTitle: string[] = title.split(' ');
        for (const part of splitTitle) {
            if (part.indexOf(word) >= 0) {
                return true;
            }
        }
        return false;
    }
}

export class NumberOfCitationsFilter extends ArticlesFilter<number> {
    constructor(value: number) {
        super(value);
    }
    apply(model: ArticlesModel): void {
        const newArticles: Article[] = model.articles.filter((article: Article) => article.citation >= this.value);
        model.articles = newArticles;
    }
}

export class KeywordsFilter extends ArticlesFilter<string[]> {
    constructor(value: string[]) {
        super(value);
    }
    apply(model: ArticlesModel): void {
        let newArticles: Article[] = model.articles;
        for (const x of this.value) {
            newArticles = newArticles.filter((article: Article) => {
                if (article.abstract == null) {
                    return false;
                }
                const lowerCaseValue: string = x.toLowerCase();
                const lowerCaseName: string = article.abstract.toLowerCase();
                return lowerCaseName.indexOf(lowerCaseValue) >= 0;
            });
        }
        model.articles = newArticles;
    }
}
