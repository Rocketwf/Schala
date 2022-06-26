import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';

export class ComparisonRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: RowModel[];
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderComparison(): void {
        return null;
    }

    public get rowModels(): RowModel[] {
        return this._rowModels;
    }
}
