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
