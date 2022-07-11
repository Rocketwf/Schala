/**
 * This class represents a data structure for information of 
 * citations for a year
 */
export class CitationsByYear {
    /**
     * Year of citations by year
     */
    private _year: number;
    /**
     * Self citations count of citations by year
     */
    private _selfCitationsCount: number;
    /**
     * Indirect self citations count of citations by year
     */
    private _indirectSelfCitationsCount: number;
    /**
     * Total citation count of citations by year
     */
    private _totalCitationCount: number;

    /**
     * Creates an instance of citations by year.
     * @param _year - Year of the citation count
     * @param _selfCitationsCount - Number of self citations
     * @param _indirectSelfCitationsCount - Number of indirect self citations
     * @param _totalCitationCount - Number of total citations
     */
    constructor(
        _year: number,
        _selfCitationsCount: number,
        _indirectSelfCitationsCount: number,
        _totalCitationCount: number,
    ) {
        this._year = _year;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
        this._totalCitationCount = _totalCitationCount;
    }

    /**
     * Gets year
     */
    public get year(): number {
        return this._year;
    }

    /**
     * Sets year
     */
    public set year(_year: number) {
        this._year = _year;
    }

    /**
     * Gets self citations count
     */
    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    /**
     * Sets self citations count
     */
    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }

    /**
     * Gets indirect self citations count
     */
    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationsCount;
    }

    /**
     * Sets indirect self citations count
     */
    public set indirectSelfCitationsCount(_indirectSelfCitationsCount: number) {
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
    }

    /**
     * Gets total citation count
     */
    public get totalCitationCount(): number {
        return this._totalCitationCount;
    }

    /**
     * Sets total citation count
     */
    public set totalCitationCount(_totalCitationCount: number) {
        this._totalCitationCount = _totalCitationCount;
    }
}
