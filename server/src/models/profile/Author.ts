export class Author {
    private _name: string;
    private _jointPublicationCount: number;
    private _hIndex: number;
    
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