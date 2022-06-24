export abstract class Profile {}
export class BasicProfile implements Profile {
    private _id: string;
    private _name: string;
    private _affiliation: string[];
    private _totalCitations: number;

    constructor(_id: string) {
        this._id = _id;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get affiliation(): string[] {
        return this._affiliation;
    }

    public set affiliation(affiliation: string[]) {
        this._affiliation = affiliation;
    }

    public get totalCitations(): number {
        return this._totalCitations;
    }

    public set totalCitations(totalCitations: number) {
        this._totalCitations = totalCitations;
    }
}
export class FullProfile {
    private _basicProfile: BasicProfile;
    private _hIndex: HIndex;
    private _i10Index: I10Index;

    constructor(basicProfile: BasicProfile, hIndex: HIndex, i10Index: I10Index) {
        this._basicProfile = basicProfile;
        this._hIndex = hIndex;
        this._i10Index = i10Index;
    }

    public get basicProfile(): BasicProfile {
        return this._basicProfile;
    }

    public get hIndex(): HIndex {
        return this._hIndex;
    }

    public get i10Index(): I10Index {
        return this._i10Index;
    }
}
export class HIndex {
    private _hIndex: number;
    private _hIndexWithoutSelfCitations: number;

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
export class I10Index {
    private _i10Index: number;
    private _i10IndexWithoutSelfCitations: number;

    constructor(i10Index: number, i10IndexWithoutSelfCitations: number) {
        this._i10Index = i10Index;
        this._i10IndexWithoutSelfCitations = i10IndexWithoutSelfCitations;
    }

    public get i10Index(): number {
        return this._i10Index;
    }

    public get i10IndexWithoutSelfCitations(): number {
        return this._i10IndexWithoutSelfCitations;
    }
}
