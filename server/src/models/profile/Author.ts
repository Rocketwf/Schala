export class Author {
    private _id: string;
    private _name: string;
    private _jointPublicationCount: number;
    private _hIndex: number;

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
