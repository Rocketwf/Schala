import { FullProfile, RowModel } from '../models';

/**
 * Builds the data structure that will be given to ComparePage.
 */
export class ComparisonRepresentation {
    private _fullProfiles: FullProfile[];

    /**
     * Rows to be displayed in the comparison.
     */
    private _rowModels: RowModel[];

    /**
     *  Constructs the ComparisonRepresentation
     * @param _fullProfiles - FullProfiles present in the ComparePage
     */
    constructor(_fullProfiles: FullProfile[]) {
        this._fullProfiles = _fullProfiles;
        this._rowModels = new Array<RowModel>();
    }

    /**
     * Updates the rows of ComparePage.
     * @returns void
     */
    renderComparison(): void {
        if (this.fullProfiles.length === 0) {
            return;
        }
        this._rowModels = [];
        this.createCitationsByYearRow();
        this.createCitationsExpertiseRow();
    }

    /**
     * Getter method of RowModels.
     */
    public get rowModels(): RowModel[] {
        return this._rowModels;
    }

    /**
     * Setter method of RowModel list.
     */
    public set rowModels(rowModels: RowModel[]) {
        this._rowModels = rowModels;
    }

    /**
     * Adds a row into the RowModel list.
     * @param rowModel - Rowmodel to push
     */
    public pushRow(rowModel: RowModel): void {
        this._rowModels.push(rowModel);
    }

    /**
     * Getter method of the fullProfiles
     */
    public get fullProfiles(): FullProfile[] {
        return this._fullProfiles;
    }

    /**
     * Setter method of the fullProfiles
     */
    public set fullProfiles(fullProfile: FullProfile[]) {
        this._fullProfiles = fullProfile;
    }
    private createPublicationByVenueYearRow(): RowModel {
        return null;
    }
    private createCitationsByYearRow(): void {
        return;
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

    /**
     * Creates citations and expertise rows.
     * @returns - RowModel containing the citations and expertise models
     */
    private createCitationsExpertiseRow(): void {
        return;
    }
}
