/**
 * This class represents a cited scholar
 */
export class CitedScholar 
{
    /**
     * Name of the cited scholar
     */
    private _name: string;
    /**
     * Citation count of the cited scholar
     */
    private _citationCount: number;

    /**
     * Creates an instance of cited scholar.
     * @param _name - The name of the scholar 
     * @param _citationCount - The citation count of the scholar
     */
    constructor(_name: string, _citationCount: number) 
    {
        this._name = _name;
        this._citationCount = _citationCount;
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
     * Gets citation count
     */
    public get citationCount(): number 
    {
        return this._citationCount;
    }

    /**
     * Sets citation count
     */
    public set citationCount(_citationCount: number) 
    {
        this._citationCount = _citationCount;
    }
}
