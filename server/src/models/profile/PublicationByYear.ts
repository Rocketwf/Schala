/**
 * This class represents a tuple of a year and the number of
 * publications for that year
 */
export class PublicationByYear {
    /**
     * Year of the publication by year data
     */
    private _year: number;
    /**
     * Publications count of the scholar
     */
    private _publicationsCount: number;

    /**
     * Creates an instance of publication by year.
     * @param _year - Year of the publication by year data
     * @param _publicationCount - Publication count of the scholar
     */
    constructor(_year: number, _publicationCount: number) {
        this._year = _year;
        this._publicationsCount = _publicationCount;
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
     * Gets publications count
     */
    public get publicationsCount(): number {
        return this._publicationsCount;
    }

    /**
     * Sets publications count
     */
    public set publicationsCount(_publicationsCount: number) {
        this._publicationsCount = _publicationsCount;
    }
}
