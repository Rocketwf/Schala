/**
 * This class represents a tuple of a venue and the total publication count for that venue
 */
export class PublicationByVenue 
{
    /**
     * Venue of the publication
     */
    private _venue: string;
    /**
     * Publication count for the venue
     */
    private _publicationCount: number;

    /**
     * Creates an instance of publication by venue.
     * @param _venue - Venue of the publication
     * @param _publicationCount - Publication count for the venue
     */
    constructor(_venue: string, _publicationCount: number) 
    {
        this._venue = _venue;
        this._publicationCount = _publicationCount;
    }
    /**
     * Gets venue
     */
    public get venue(): string 
    {
        return this._venue;
    }

    /**
     * Sets venue
     */
    public set venue(_venue: string) 
    {
        this._venue = _venue;
    }

    /**
     * Gets publication count
     */
    public get publicationCount(): number 
    {
        return this._publicationCount;
    }

    /**
     * Sets publication count
     */
    public set publicationCount(_publicationCount: number) 
    {
        this._publicationCount = _publicationCount;
    }
}
