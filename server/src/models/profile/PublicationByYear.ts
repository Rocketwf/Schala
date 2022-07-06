export class PublicationByYear {
    private _year: number;
    private _publicationsCount: number;

    constructor(_year: number, _publicationCount: number) {
        this._year = _year;
        this._publicationsCount = _publicationCount;
    }
    public get year(): number {
        return this._year;
    }
    
    public set year(_year: number) {
        this._year = _year;
    }

    public get publicationsCount(): number {
        return this._publicationsCount;
    }

    public set publicationsCount(_publicationsCount: number) {
        this._publicationsCount = _publicationsCount;
    }
}