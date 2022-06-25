export class Article {
    private _title: string;
    private _year: number;
    private _citation: number;
    private _selfCitations: number;
    private _bibTex: string;
    private _url: string;
    private _venue: string;

    constructor(
        _title: string,
        _year: number,
        _citation: number,
        _selfCitation: number,
        _bibTex: string,
        _url: string,
        _venue: string,
    ) {
        this._title = _title;
        this._year = _year;
        this._citation = _citation;
        this._selfCitations = _selfCitation;
        this._bibTex = _bibTex;
        this._url = _url;
        this._venue = _venue;
    }

    public get title(): string {
        return this._title;
    }
    public get year(): number {
        return this._year;
    }
    public get citation(): number {
        return this._citation;
    }
    public get selfCitation(): number {
        return this._selfCitations;
    }
    public get bibTex(): string {
        return this._bibTex;
    }
    public get url(): string {
        return this._url;
    }
    public get venue(): string {
        return this._venue;
    }
}

export class CoAuthor {
    private _id: string;
    private _name: string;
    private _coauthoredCount: number;

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
    public get coAuthoredCount(): number {
        return this._coauthoredCount;
    }
}
