import { HIndex } from '../profile/HIndex'
import { I10Index } from '../profile/I10Index'

export class Profile{}
export class BasicProfile{}
export class FullProfile{
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