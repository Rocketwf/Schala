export class Article {
    private _title: string;
    private _venue: string;
    private _publicationYear: number;
    private _citationsCount: number;
    private _url: string;
    private _coAuthors: ArticleCoAuthor[];
    private _abstract: string;

    constructor(
        _title: string,
        _venue: string,
        _year: number,
        _citationsCount: number,
        _url: string,
        _coAuthors: ArticleCoAuthor[],
        _abstract: string,
    ) {
        this._title = _title;
        this._venue = _venue;
        this._publicationYear = _year;
        this._citationsCount = _citationsCount;
        this._url = _url;
        this._coAuthors = _coAuthors;
        this._abstract = _abstract;
    }

    public get publicationYear(): number {
        return this._publicationYear;
    }
    public set publicationYear(publicationYear: number) {
        this._publicationYear = publicationYear;
    }
    public get citationCount(): number {
        return this._citationsCount;
    }

    public set citationCount(newCitationCount: number) {
        this._citationsCount = newCitationCount;
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get venue(): string {
        return this._venue;
    }

    public set venue(venue: string) {
        this._venue = venue;
    }

    public get coAuthors(): ArticleCoAuthor[] {
        return this._coAuthors;
    }

    public set coAuthors(coAuthors: ArticleCoAuthor[]) {
        this._coAuthors = coAuthors;
    }

    public get url(): string {
        return this._url;
    }

    public set url(url: string) {
        this._url = url;
    }

    public get abstract(): string {
        return this._abstract;
    }

    public set abstract(abstract: string) {
        this._abstract = abstract;
    }
}

export class ArticleCoAuthor {
    private _id: string;
    private _name: string;
    constructor(_id: string, _name: string) {
        this._id = _id;
        this._name = _name;
    }

    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
}
