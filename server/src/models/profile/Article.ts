import { ArticleCoAuthor } from './ArticleCoAuthor';

/**
 * This class represents an article
 */
export class Article {
    /**
     * Title of article
     */
    private _title: string;
    /**
     * Venue  of article
     */
    private _venue: string;
    /**
     * Publication year of article
     */
    private _publicationYear: number;
    /**
     * Citation count of article
     */
    private _citationCount: number;
    /**
     * Self citations count of article
     */
    private _selfCitationsCount: number;
    /**
     * Url of article
     */
    private _url: string;
    /**
     * Abstract of article
     */
    private _abstract: string;

    /**
     * Articles co-authors of article
     */
    private _articlesCoAuthors: ArticleCoAuthor[];

    /**
     * Creates an instance of article.
     * @param _title - The title of the article
     * @param _venue - The venue of the article the article was published in
     * @param _publicationYear - The publication year of the article
     * @param _citationCount - The citation count of the article
     * @param _selfCitationsCount - The self-citation count of the article
     * @param _url - The url of the article
     * @param _abstract - The abstract of the article
     * @param _articlesCoAuthors - The coauthors of the article
     */
    constructor(
        _title: string,
        _venue: string,
        _publicationYear: number,
        _citationCount: number,
        _selfCitationsCount: number,
        _url: string,
        _abstract: string,
        _articlesCoAuthors: ArticleCoAuthor[],
    ) {
        this._title = _title;
        this._venue = _venue;
        this._publicationYear = _publicationYear;
        this._citationCount = _citationCount;
        this._selfCitationsCount = _selfCitationsCount;
        this._url = _url;
        this._abstract = _abstract;
        this._articlesCoAuthors = _articlesCoAuthors;
    }

    /**
     * Gets title
     */
    public get title(): string {
        return this._title;
    }

    /**
     * Sets title
     */
    public set title(_title: string) {
        this._title = _title;
    }

    /**
     * Gets venue
     */
    public get venue(): string {
        return this._venue;
    }

    /**
     * Sets venue
     */
    public set venue(_venue: string) {
        this._venue = _venue;
    }

    /**
     * Gets publication year
     */
    public get publicationYear(): number {
        return this._publicationYear;
    }

    /**
     * Sets publication year
     */
    public set publicationYear(_publicationYear: number) {
        this._publicationYear = _publicationYear;
    }

    /**
     * Gets citation count
     */
    public get citationCount(): number {
        return this._citationCount;
    }

    /**
     * Sets citation count
     */
    public set citationCount(_citationCount: number) {
        this._citationCount = _citationCount;
    }

    /**
     * Gets self citations count
     */
    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    /**
     * Sets self citations count
     */
    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }

    /**
     * Gets url
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Sets url
     */
    public set url(_url: string) {
        this._url = _url;
    }

    /**
     * Gets articles co authors
     */
    public get articlesCoAuthors(): ArticleCoAuthor[] {
        return this._articlesCoAuthors;
    }

    /**
     * Sets articles co authors
     */
    public set articlesCoAuthors(_articlesCoAuthors: ArticleCoAuthor[]) {
        this._articlesCoAuthors = _articlesCoAuthors;
    }

    /**
     * Gets abstract
     */
    public get abstract(): string {
        return this._abstract;
    }

    /**
     * Sets abstract
     */
    public set abstract(_abstract: string) {
        this._abstract = _abstract;
    }
}
