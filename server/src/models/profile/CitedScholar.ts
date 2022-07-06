export class CitedScholar {
    private _name: string;
    private _citationCount: number;

    public get name(): string {
        return this._name;
    }
    
    public set name(_name: string) {
        this._name = _name;
    }

    public get citationCount(): number {
        return this._citationCount;
    }

    public set citationCount(_citationCount: number) {
        this._citationCount = _citationCount;
    }

}