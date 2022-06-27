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
    //TODO: Implement these (I didnt because it was getting too late ZZZZzzzzz)
    public set rowModels(rowModels: RowModel[]) {
        this._rowModels = rowModels;
    }
    public pushRow(rowModel: RowModel): void {
        this._rowModels.push(rowModel);
    }
    private createPublicationByVenueYearRow(): RowModel {
        return null;
    }
    private createCitationsByYearRow(): RowModel {
        return null;
    }
    private createMostFrequentCoAuthorsRow(): RowModel {
        return null;
    }
    private createCoAuthorsWithHighestHIndexRow(): RowModel {
        return null;
    }
    private createPublicationByYearRow(): RowModel {
        return null;
    }
    private createCitationsExpertiseRow(): RowModel {
        return null;
    }
}
