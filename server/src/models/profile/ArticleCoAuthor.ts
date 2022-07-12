/**
 * This class represents a co-author for an article
 */
export class ArticleCoAuthor 
{
    /**
     * Id the co-author
     */
    private _id: string;
    /**
     * Name of the co-author
     */
    private _name: string;

    /**
     * Creates an instance of an article co-author.
     * @param _id - The ID of the author
     * @param _name - The name of the author
     */
    constructor(_id: string, _name: string) 
    {
        this._id = _id;
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
}
