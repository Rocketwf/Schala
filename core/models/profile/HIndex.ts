export class HIndex {
    private _hIndex: number
    private _hIndexWithoutSelfCitations: number

    constructor(hIndex: number, hIndexWithoutSelfCitations: number) {
        this._hIndex = hIndex;
        this._hIndexWithoutSelfCitations = hIndexWithoutSelfCitations;
    }

    public get hIndex(): number {
        return this._hIndex;
    }

    public get hIndexWithoutSelfCitations(): number {
        return this._hIndexWithoutSelfCitations;
    }
}