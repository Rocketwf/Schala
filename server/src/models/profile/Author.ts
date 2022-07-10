export class Author {
    /**
     * Id  of author
     */
    private _id: string;
    /**
     * Name  of author
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
     * @param _id 
     * @param _name 
     * @param _jointPublicationCount 
     * @param _hIndex 
     */
    constructor(_id: string, _name: string, _jointPublicationCount: number, _hIndex: number) {
        this._id = _id;
        this._hIndex = _hIndex;
        this._jointPublicationCount = _jointPublicationCount;
        this._name = _name;
    }

    public get id(): string {
        return this._id;
    }
    public set id(_id: string) {
        this._id = _id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(_name: string) {
        this._name = _name;
    }

    public get jointPublicationCount(): number {
        return this._jointPublicationCount;
    }

    public set jointPublicationCount(_jointPublicationCount: number) {
        this._jointPublicationCount = _jointPublicationCount;
    }

    public get hIndex(): number {
        return this._hIndex;
    }

    public set hIndex(_hIndex: number) {
        this._hIndex = _hIndex;
    }
}
