import { Profile } from './Profile';
import { Expertise } from './Expertise';

/**
 * This class represents a basic profile containing the basic information of a scholar
 */
export class BasicProfile extends Profile 
{
    /**
     * The expertises of the scholar
     */
    private _expertise: Expertise[];
    /**
     * Id of the basic profile
     */
    private _id: string;
    /**
     * Name of the basic profile
     */
    private _name: string;
    /**
     * Affiliations of the basic profile
     */
    private _affiliations: string[];
    /**
     * Total citations of the basic profile
     */
    private _totalCitations: number;
    /**
     * Picture url of the basic profile
     */
    private _pictureUrl: string;
    /**
     * Paper count of the basic profile
     */
    private _paperCount: number;

    private _alias: string;

    /**
     * Creates an instance of basic profile.
     * @param _id - The ID of the basic profile
     * @param _name - The name of the basic profile
     * @param _affiliations - The affiliations of the basic profile
     * @param _totalCitations - The total citations of the basic profile
     * @param _paperCount - The paper count of the basic profile
     * @param _pictureUrl - The picture URL of the basic profile
     */
    constructor(
        _id: string,
        _name?: string,
        _affiliations?: string[],
        _totalCitations?: number,
        _paperCount?: number,
        _pictureUrl?: string,
        _expertise?: Expertise[],
        _alias?: string,
    ) 
    {
        super();
        this._expertise = _expertise;
        this._id = _id;
        this._name = _name;
        this._affiliations = _affiliations;
        this._totalCitations = _totalCitations;
        this._paperCount = _paperCount;
        this._pictureUrl = _pictureUrl;
        this._alias = _alias;
    }

    public get expertise(): Expertise[] 
    {
        return this._expertise;
    }
    public set expertise(_expertise: Expertise[]) 
    {
        this._expertise = _expertise;
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
    public set id(newId: string) 
    {
        this._id = newId;
    }

    public get alias(): string 
    {
        return this._alias;
    }
    public set alias(newAlias: string) 
    {
        this._alias = newAlias;
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
    public set name(newName: string) 
    {
        this._name = newName;
    }

    /**
     * Gets total citations
     */
    public get totalCitations(): number 
    {
        return this._totalCitations;
    }

    /**
     * Sets total citations
     */
    public set totalCitations(totalCitations: number) 
    {
        this._totalCitations = totalCitations;
    }

    /**
     * Gets paper count
     */
    public get paperCount(): number 
    {
        return this._paperCount;
    }

    /**
     * Sets paper count
     */
    public set paperCount(paperCount: number) 
    {
        this._paperCount = paperCount;
    }

    /**
     * Gets picture url
     */
    public get pictureUrl(): string 
    {
        return this._pictureUrl;
    }

    /**
     * Sets picture url
     */
    public set pictureUrl(url: string) 
    {
        this._pictureUrl = url;
    }

    /**
     * Gets affiliations
     */
    public get affiliations(): string[] 
    {
        return this._affiliations;
    }

    /**
     * Sets affiliations
     */
    public set affiliations(affiliations: string[]) 
    {
        this._affiliations = affiliations;
    }
}
