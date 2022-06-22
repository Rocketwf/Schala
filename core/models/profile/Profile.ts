import { HIndex } from '../profile/HIndex'
import { I10Index } from '../profile/I10Index'

export interface Profile {}
export class BasicProfile implements Profile {

  private _id: number;
  private _name: string;
  private _affiliation: string;
  private _totalCitations: number;

  constructor(id: number) {
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get affiliation(): string {
    return this._affiliation;
  }

  public get totalCitations(): number {
    return this._totalCitations;
  }

}
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
