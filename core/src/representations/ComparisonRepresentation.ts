import { Series, StackedColumns100ChartModel, ViewName } from '../models';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';

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
        this._rowModels = new Array<RowModel>();
        if (this.fullProfiles.length === 0) {
            return;
        }
        const cerRow: RowModel = this.createCitationsExpertiseRow();

        this.pushRow(cerRow);
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

    /**
     * Creates citations and expertise rows.
     * @returns - RowModel containing the citations and expertise models
     */
    private createCitationsExpertiseRow(): RowModel {
        const cerRow: RowModel = new RowModel(12);
        const series: Array<Series> = new Array<Series>();

        this.fullProfiles.forEach((profile: FullProfile) => {
            series.push(
                new Series(profile.basicProfile.name, [
                    profile.basicProfile.totalCitations - profile.selfCitations - profile.indirectSelfCitations,
                    profile.selfCitations,
                    profile.indirectSelfCitations,
                ]),
            );
        });

        const labels: string[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            labels.push(profile.basicProfile.name);
        });

        const stackedColumns100ChartModel: StackedColumns100ChartModel = new StackedColumns100ChartModel(
            'Citations',
            '',
            ViewName.StackedColumns100ChartCard,
            6,
            series,
            'Scholar Names',
            '',
            labels,
        );
        cerRow.simpleCardModels.push(stackedColumns100ChartModel);

        return cerRow;
    }
}
