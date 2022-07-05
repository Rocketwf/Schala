import {
    FullProfile,
    RowModel,
    ViewName,
    ObjectSeriesChartModel,
    Series,
    Citations,
    StackedColumnsChartModel,
    StackedColumns100ChartModel,
} from '../models';

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
        const rowModel: RowModel = new RowModel(12);
        for (const fullProfile of this._fullProfiles) {
            const series: Series[] = new Array<Series>();
            /*fullProfile.citations.forEach((citations: Citations, year: number) => {
                series.push(
                    new Series(year + '', [
                        citations.indirectSelfCitationsCount,
                        citations.selfCitationsCount,
                        citations.totalCitationsCount -
                            citations.selfCitationsCount -
                            citations.indirectSelfCitationsCount,
                    ]),
                );
            });*/
            const objectSeriesChartModel: ObjectSeriesChartModel = new StackedColumnsChartModel(
                'Citation by year',
                '',
                ViewName.StackedColumnsChartCard,
                3,
                series,
                'Years',
                'Number of citations',
                ['indirect self-citation', 'self-citations', 'cited by others'],
            );
            rowModel.simpleCardModels.push(objectSeriesChartModel);
        }
        this._rowModels.push(rowModel);
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
        const cerRow: RowModel = new RowModel(12);
        const series: Array<Series> = new Array<Series>();

        this.fullProfiles.forEach((profile: FullProfile) => {
            /*series.push(
                new Series(profile.basicProfile.name, [
                    profile.getTotalCitationsCount() -
                        profile.getSelfCitationsCount() -
                        profile.getIndirectSelfCitationsCount(),
                    profile.getSelfCitationsCount(),
                    profile.getIndirectSelfCitationsCount(),
                ]),
            );*/
        });

        const labels: string[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            //labels.push(profile.basicProfile.name);
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
        this.rowModels.push(cerRow);
    }
}
