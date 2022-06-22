import { Profile } from "./models";

class BasicProfile implements Profile {

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

export default BasicProfile;