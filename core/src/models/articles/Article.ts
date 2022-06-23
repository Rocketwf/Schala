export class Article {
    private _title: string
    private _year: number
    private _citation: number
    private _selfCitations: number
    private _bibTex: String
    private _url: string
    private _venue: string

    constructor(_title: string, _year: number, _citation: number, _selfCitation: number, _bibTex: string, _url: string, _venue: string){
        this._title = _title
        this._year = _year
        this._citation = _citation
        this._selfCitations = _selfCitation
        this._bibTex = _bibTex
        this._url = _url
        this._venue = _venue
    }

    public get title() {
        return this._title
    }
    public get year() {
        return this._year
    }
    public get citation() {
        return this._citation
    }
    public get selfCitation() {
        return this._selfCitations
    }
    public get bibTex() {
        return this._bibTex
    }
    public get url() {
        return this._url
    }
    public get venue() {
        return this._venue
    }
}
