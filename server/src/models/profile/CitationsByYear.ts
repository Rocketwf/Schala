export class CitationsByYear {
    private _year: number;
    private _selfCitationsCount: number;
    private _indirectSelfCitationsCount: number;
    private _totalCitationCount: number;

    public get year(): number {
        return this._year;
    }

    public set year(_year: number) {
        this._year = _year;
    }
    
    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }

    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationsCount;
    }

    public set indirectSelfCitationsCount(_indirectSelfCitationsCount: number) {
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
    }
    
    public get totalCitationCount(): number {
        return this._totalCitationCount;
    }

    public set totalCitationCount(_totalCitationCount: number) {
        this._totalCitationCount = _totalCitationCount;
    }
}