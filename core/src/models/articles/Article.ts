export class Article {
    private _title: string;
    private _venue: string;
    private _publicationYear: number;
    private _citationsCount: number;
    private _url: string;
    private _coAuthors: string[];
    constructor(
        _title: string,
        _venue: string,
        _year: number,
        _citationsCount: number,
        _url: string,
        _coAuthors: string[],
    ) {
        this._title = _title;
        this._venue = _venue;
        this._publicationYear = _year;
        this._citationsCount = _citationsCount;
        this._url = _url;
        this._coAuthors = _coAuthors;
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

    public get coAuthors(): string[] {
        return this._coAuthors;
    }

    public set coAuthors(coAuthors: string[]) {
        this._coAuthors = coAuthors;
    }

    public get url(): string {
        return this._url;
    }
    public set urll(url: string) {
        this._url = url;
    }
}

export class Author {
    private _name: string;
    private _hIndex: number;
    private _jointPublicationCount: number;

    constructor(_name: string, _jointPublicationCount: number, _hIndex?: number) {
        this._name = _name;
        this._jointPublicationCount = _jointPublicationCount;
        this._hIndex = _hIndex;
    }
    public get name(): string {
        return this._name;
    }
    public set name(newName: string) {
        this._name = newName;
    }

    public get jointPublicationCount(): number {
        return this._jointPublicationCount;
    }
    public set jointPublicationCount(newJointPublicationCount: number) {
        this._jointPublicationCount = newJointPublicationCount;
    }
    public get hIndex(): number {
        return this._hIndex;
    }
    public set hIndex(newHIndex: number) {
        this._hIndex = newHIndex;
    }
}
