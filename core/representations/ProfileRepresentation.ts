import { FullProfile } from '../models/profile/Profile'
import { RowModel} from '../models/viewmodels/RowModel'

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: RowModel[];
    constructor(_fullProfile: FullProfile) {
      this._fullProfile = _fullProfile;
      this._rowModels = new Array<RowModel>();
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

    public get rowModels() : RowModel[] {
      return this._rowModels;
    }
}
