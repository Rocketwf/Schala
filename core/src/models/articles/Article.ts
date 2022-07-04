export class Article {
    private _title: string;
    private _venue: string;
    private _publicationYear: number;
    private _citationsCount: number;
    private _url: string;
    private _CoAuthors: string[];

    constructor(
        _title: string,
        _venue: string,
        _year: number,
        _citationsCount: number,
        _url: string,
        _CoAuthors: string[],
    ) {
        this._title = _title;
        this._venue = _venue;
        this._publicationYear = _year;
        this._citationsCount = _citationsCount;
        this._url = _url;
        this._CoAuthors = _CoAuthors;
    }
    public get year(): number {
        return this._publicationYear;
    }
    public set year(newYear: number) {
        this._publicationYear = newYear;
    }
    public get citationCount(): number {
        return this._citationsCount;
    }

    public set citationCount(newCitationCount: number) {
        this._citationsCount = newCitationCount;
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
/*export class ReferenceOrCitation {
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
}*/
