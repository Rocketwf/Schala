import { FullProfile } from '../models/profile/Profile'

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    constructor(_fullProfile: FullProfile) {
      this._fullProfile = _fullProfile;
    }
    renderProfile() {
        return null;
    }
    
    public get fullProfile() : FullProfile {
      return this._fullProfile;
    }
    public set fullProfile(fullProfile: FullProfile) {
      this._fullProfile = fullProfile;
    }
}
