import { ArticleCoAuthor } from './ArticleCoAuthor';

export class Article {
    private _title: string;
    private _venue: string;
    private _publicationYear: number;
    private _citationCount: number;
    private _selfCitationsCount: number;
    private _url: string;
    private _abstract: string;

    private _articlesCoAuthors: ArticleCoAuthor[];

    public get title(): string {
        return this._title;
    }

    public set title(_title: string) {
        this._title = _title;
    }

    public get venue(): string {
        return this._venue;
    }

    public set venue(_venue: string) {
        this._venue = _venue;
    }

    public get publicationYear(): number {
        return this._publicationYear;
    }

    public set publicationYear(_publicationYear: number) {
        this._publicationYear = _publicationYear;
    }

    public get citationCount(): number {
        return this._citationCount;
    }

    public set citationCount(_citationCount: number) {
        this._citationCount = _citationCount;
    }

    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }

    public get url(): string {
        return this._url;
    }

    public set url(_url: string) {
        this._url = _url;
    }

    public get articlesCoAuthors(): ArticleCoAuthor[] {
        return this._articlesCoAuthors;
    }

    public set articlesCoAuthors(_articlesCoAuthors: ArticleCoAuthor[]) {
        this._articlesCoAuthors = _articlesCoAuthors;
    }

    public get abstract(): string {
        return this._abstract;
    }

    public set abstract(_abstract: string) {
        this._abstract = _abstract;
    }
}
