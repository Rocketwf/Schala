import { Article, ArticleCoAuthor, ArticlesModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ArticlesFilter<S> extends Filter<S, ArticlesModel> {}

export class ArticlesPaginationFilter extends ArticlesFilter<number> {
    /**
     * It checks if the given model is valid
     * @param model -The given ArticlesModel
     * @returns true if the given model is valid
     */
    validate(model: ArticlesModel): boolean {
        model;
        return true;
    }
    /**
     *  Integer representing the number of articles per page.
     */
    private _hitsPerPage: number = 10;
    /**
     * Creates an instance of articles pagination filter.
     * @param value - the given filter value
     */
    constructor(value: number) {
        super(value);
    }

    /**
     * Setter method of the hitsPerPage attribute.
     */
    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    /**
     * Getter method of the hitsPerPage attribute
     */
    public get hitsPerPage(): number {
        return this._hitsPerPage;
    }

    /**
     * Applys articles pagination filter on the given model
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        const slicedArticles: Article[] = new Array<Article>();
        let start: number = (this.value - 1) * this._hitsPerPage;
        let end: number = (this.value - 1) * this._hitsPerPage + this._hitsPerPage;
        if (end >= model.articles.length) {
            end = model.articles.length;
        }
        for (start; start < end; ++start) {
            slicedArticles.push(model.articles[start]);
        }
        model.articles = slicedArticles;
    }
}

export class SortByFilter extends ArticlesFilter<string> {
    /**
     * Creates an instance of sort by filter.
     * @param value - the given filter value
     */
    constructor(value: string) {
        super(value);
    }
    /**
     * Applys sort by filter on the given model
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        const newArticles: Article[] = model.articles.sort((n1: Article, n2: Article) => {
            if (this.value == 'year') {
                if (n1.publicationYear < n2.publicationYear) {
                    return 1;
                }
                if (n1.publicationYear > n2.publicationYear) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'citations') {
                if (n1.citationCount < n2.citationCount) {
                    return 1;
                }
                if (n1.citationCount > n2.citationCount) {
                    return -1;
                }
                return 0;
            } else if (this.value == 'self-citations') {
                if (n1.citationCount < n2.citationCount) {
                    return 1;
                }
                if (n1.citationCount > n2.citationCount) {
                    return -1;
                }
                return 0;
            }
        });
        model.articles = newArticles;
    }
}
export class CoauthorsFilter extends ArticlesFilter<string> {
    /**
     * Creates an instance of coauthors filter.
     * @param value - the given filter value
     */
    constructor(value: string) {
        super(value);
    }

    /**
     * It checks if the given model is valid
     * @param model - the given ArticlesModel
     * @returns true if the given model is valid
     */
    validate(model: ArticlesModel): boolean {
        model;
        return true;
    }

    /**
     * Applys coauthors filter on the given model
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        if (this.value === '') {
            return;
        }
        const newArticles: Article[] = new Array<Article>();
        const splitInput: string[] = this.value.toLowerCase().split(',');
        for (const x of splitInput) {
            for (const art of model.articles) {
                if (this.contains(art.coAuthors, x)) {
                    newArticles.push(art);
                }
            }
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if a string includes given substrings.
     */
    /**
     *  Method for checking if a string includes given substrings
     * @param coAuthors - the article's co-authors' names
     * @param name - the given co-author name
     * @returns true if the article's co-authors' names contain the given co-author name
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
    /**
     * Creates an instance of words in article title filter.
     * @param value - the given filter value
     */
    constructor(value: string) {
        super(value);
    }

    /**
     * It checks if the given model is valid
     * @param model - the given ArticlesModel
     * @returns true if the given model is valid
     */
    validate(model: ArticlesModel): boolean {
        model;
        return true;
    }

    /**
     * Applys words in article title filter on the given model
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        if (this.value === '') {
            return;
        }
        const newArticles: Article[] = new Array<Article>();
        const splitInput: string[] = this.value.toLowerCase().split(',');
        for (const x of splitInput) {
            for (const art of model.articles) {
                if (this.contains(art.title, x)) {
                    newArticles.push(art);
                }
            }
        }
        model.articles = newArticles;
    }

    /**
     * Method for checking if given word in the title
     * @param title - the given title of the article
     * @param word - the given word that is searched for
     * @returns true if title contains the given word
     */
    private contains(title: string, word: string): boolean {
        if (title.toLowerCase().indexOf(word) >= 0) {
            return true;
        }
        return false;
    }
}

export class NumberOfCitationsFilter extends ArticlesFilter<string> {
    /**
     * Creates an instance of number of citations filter.
     * @param value - value of the filter
     */
    constructor(value: string) {
        super(value);
    }

    /**
     * It checks if the given model is valid
     * @param model - the given ArticlesModel
     * @returns true if the given model is valid
     */
    validate(model: ArticlesModel): boolean {
        model;
        return true;
    }
    /**
     * Applys number of citations filter
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        if (this.value === '') {
            return;
        }
        const newArticles: Article[] = new Array<Article>();
        for (const art of model.articles) {
            if (art.citationCount >= +this.value) {
                newArticles.push(art);
            }
        }
        model.articles = newArticles;
    }
}

export class KeywordsFilter extends ArticlesFilter<string> {
    /**
     * Creates an instance of keywords filter.
     * @param value - the given value of the filter
     */
    constructor(value: string) {
        super(value);
    }

    /**
     * It checks if the given model is valid
     * @param model - the given ArticlesModel
     * @returns true if the given model is valid
     */
    validate(model: ArticlesModel): boolean {
        model;
        return true;
    }

    /**
     * Applys keywords filter on the given model
     * @param model - the given ArticlesModel
     */
    apply(model: ArticlesModel): void {
        if (this.value === '') {
            return;
        }
        const newArticles: Article[] = new Array<Article>();
        for (const x of this.value.toLowerCase().split(',')) {
            for (const art of model.articles) {
                if (!art.abstract) {
                    continue;
                }

                const lowerCaseName: string = art.abstract.toLowerCase();
                if (lowerCaseName.indexOf(x) >= 0) {
                    newArticles.push(art);
                }
            }
        }
        model.articles = newArticles;
    }
}
