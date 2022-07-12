/**
 * This class represents an Author for the search results
 */
export class Author 
{
    /**
     * Id of author
     */
    private _id: string;
    /**
     * Name of author
     */
    private _name: string;
    /**
     * Joint publication count of author
     */
    private _jointPublicationCount: number;
    /**
     * Determines whether index h
     */
    private _hIndex: number;

    /**
     * Creates an instance of author.
     * @param _id - The ID of the author
     * @param _name - The name of the author
     * @param _jointPublicationCount - The joint publication count of the author
     * @param _hIndex - The h-index of the author
     */
    constructor(_id: string, _name: string, _jointPublicationCount: number, _hIndex: number) 
    {
        this._id = _id;
        this._hIndex = _hIndex;
        this._jointPublicationCount = _jointPublicationCount;
        this._name = _name;
    }

    /**
     * Gets id
     */
    public get id(): string 
    {
        return this._id;
    }
    /**
     * Sets id
     */
    public set id(_id: string) 
    {
        this._id = _id;
    }

    /**
     * Gets name
     */
    public get name(): string 
    {
        return this._name;
    }

    /**
     * Sets name
     */
    public set name(_name: string) 
    {
        this._name = _name;
    }

    /**
     * Gets joint publication count
     */
    public get jointPublicationCount(): number 
    {
        return this._jointPublicationCount;
    }

    /**
     * Sets joint publication count
     */
    public set jointPublicationCount(_jointPublicationCount: number) 
    {
        this._jointPublicationCount = _jointPublicationCount;
    }

    /**
     * Gets whether h index
     */
    public get hIndex(): number 
    {
        return this._hIndex;
    }

    /**
     * Sets whether h index
     */
    public set hIndex(_hIndex: number) 
    {
        this._hIndex = _hIndex;
    }
}
