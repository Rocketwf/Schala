export class Article {
    private _id: string;
    private _title: string;
    private _year: number;
    private _citation: number;
    private _selfCitations: number;
    private _bibTex: string;
    private _url: string;
    private _venue: string;
    private _citations: ReferenceOrCitation[];
    private _references: ReferenceOrCitation[];

    private _authors: Author[];

    constructor(
        _id: string,
        _title: string,
        _year: number,
        _bibTex: string,
        _url: string,
        _venue: string,
        _authors: Author[],
        _citations: ReferenceOrCitation[],
        _references: ReferenceOrCitation[],
    ) {
        this._id = _id;
        this._title = _title;
        this._year = _year;
        this._bibTex = _bibTex;
        this._url = _url;
        this._venue = _venue;
        this._authors = _authors;
        this._citations = _citations;
        this._references = _references;
    }

    public get id(): string {
        return this._id;
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

    public get authors(): Author[] {
        return this._authors;
    }

    public get citations(): ReferenceOrCitation[] {
        return this._citations;
    }
    public set citations(_citations: ReferenceOrCitation[]) {
        this._citations = _citations;
    }
    public get references(): ReferenceOrCitation[] {
        return this._references;
    }
    public set references(_references: ReferenceOrCitation[]) {
        this._references = _references;
    }
    public getSelfCitations(of: string): number {
        let selfCitationCount: number = 0;
        this.references.forEach((ref: ReferenceOrCitation) => {
            if (ref.isOwn(of)) {
                ++selfCitationCount;
            }
        });

        return selfCitationCount;
    }
}

export class Author {
    private _id: string;
    private _name: string;
    private _hIndex: number;

    constructor(_id: string, _name: string, _hIndex?: number) {
        this._id = _id;
        this._name = _name;
        this._hIndex = _hIndex;
    }
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
    public get hIndex(): number {
        return this._hIndex;
    }
}
export class ReferenceOrCitation {
    private _year: number;
    private _title: string;
    private _authors: Author[];
    constructor(_year: number, _title: string, _authors: Author[]) {
        this._year = _year;
        this._authors = _authors;
        this._title = _title;
    }

    public get title(): string {
        return this._title;
    }

    public get year(): number {
        return this._year;
    }
    public get authors(): Author[] {
        return this._authors;
    }
    public isOwn(authorId: string): boolean {
        return this._authors.filter((author: Author) => author.id === authorId).length > 0;
    }
}
