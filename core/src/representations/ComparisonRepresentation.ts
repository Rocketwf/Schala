import {
    BasicBarsChartModel,
    BasicColumnsChartModel,
    DistributedColumnsChartModel,
    FullProfile,
    LineColumnsMixedChartModel,
    RowModel,
    Series,
    StackedColumns100ChartModel,
    StackedColumnsChartModel,
    ViewName,
} from '../models';
import { PublicationByVenue, PublicationByYear } from '../models/profile/Profile';

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
        this.createPublicationByYearRow();
        this.createPublicationByVenueRow();
        this.createCitationsByYearRow();
        this.createMostFrequentCoAuthorsRow();
        this.createCoAuthorsWithHighestHIndexRow();
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

    private createPublicationByYearRow(): void {
        const rowModel: RowModel = new RowModel(12);
        const tempYearSeries: Array<Series> = new Array<Series>();

        for (let i: number = 0; i < this._fullProfiles.length; i++) {
            this._fullProfiles[i].publicationsByYear.forEach((pby: PublicationByYear) => {
                const serie: Series = new Series(pby.year + '', new Array(this._fullProfiles.length).fill(0));
                serie.data[i] = pby.publicationsCount;
                tempYearSeries.push(serie);
            });
        }
        const yearSeries: Array<Series> = [];

        tempYearSeries.forEach((serie: Series) => {
            const temp: Array<Series> = tempYearSeries.filter((yearSerie: Series) => yearSerie.name === serie.name);
            if (temp.length > 1) {
                const data: Array<Array<number>> = [];
                for (let i: number = 0; i < temp.length; i++) {
                    data.push(temp[i].data);
                }
                const newData: Array<number> = data[0].map((x: number, idx: number) =>
                    data.reduce((sum: number, curr: Array<number>) => sum + curr[idx], 0),
                );
                const newSeries: Series = new Series(temp[0].name, newData);
                if (yearSeries.filter((yearSerie: Series) => yearSerie.name === newSeries.name).length === 0) {
                    yearSeries.push(newSeries);
                }
            } else {
                const newSeries: Series = new Series(temp[0].name, temp[0].data);
                yearSeries.push(newSeries);
            }
        });

        const yearModel: BasicColumnsChartModel = new BasicColumnsChartModel(
            'Publications by year',
            '',
            ViewName.BasicColumnsChartCard,
            12,
            yearSeries,
            'Years',
            'Number of publications',
            this._fullProfiles.map((profile: FullProfile) => profile.basicProfile.name),
        );
        rowModel.simpleCardModels.push(yearModel);
        this._rowModels.push(rowModel);
    }

    private createPublicationByVenueRow(): void {
        const rowModel: RowModel = new RowModel(12);

        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const pbv of profile.publicationsByVenue) {
                series.push(new Series(pbv.venue, [pbv.publicationCount]));
            }

            const venueModel: DistributedColumnsChartModel = new DistributedColumnsChartModel(
                'Publications by venue',
                '',
                ViewName.DistributedColumnsChartCard,
                3,
                series,
                'Venues',
                'Number of publications',
                profile.publicationsByVenue.map((pbv: PublicationByVenue) => pbv.venue),
            );
            rowModel.simpleCardModels.push(venueModel);
        });

        this._rowModels.push(rowModel);
    }

    private createCitationsByYearRow(): void {
        const rowModel: RowModel = new RowModel(12);
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const cby of profile.citationsByYear) {
                const isc: number = cby.indirectSelfCitationsCount;
                const sc: number = cby.selfCitationCount;
                const cbo: number = cby.totalCitationsCount - isc - sc;
                series.push(new Series(cby.year + '', [isc, sc, cbo]));
            }
            const citationByYearModel: StackedColumnsChartModel = new StackedColumnsChartModel(
                'Citations by year',
                '',
                ViewName.StackedColumnsChartCard,
                3,
                series,
                'Years',
                'Number of citations',
                ['indirect self-citations', 'self-citations', 'cited by others'],
            );
            rowModel.simpleCardModels.push(citationByYearModel);
        });
        this._rowModels.push(rowModel);
    }

    private createMostFrequentCoAuthorsRow(): void {
        const rowModel: RowModel = new RowModel(12);
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const author of profile.authors) {
                series.push(new Series(author.name, [author.jointPublicationCount]));
            }
            const mostFrequentCoAuthorsModel: BasicBarsChartModel = new BasicBarsChartModel(
                'Most frequent co-authors',
                '',
                ViewName.BasicBarsChartCard,
                3,
                series,
                'Number of co-authored publication',
                '',
                [],
            );
            rowModel.simpleCardModels.push(mostFrequentCoAuthorsModel);
        });
        this._rowModels.push(rowModel);
    }

    private createCoAuthorsWithHighestHIndexRow(): void {
        const rowModel: RowModel = new RowModel(12);
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();

            for (const author of profile.authors) {
                series.push(new Series(author.name, [author.hIndex], 'line'));
                series.push(new Series(author.name, [author.jointPublicationCount], 'column'));
            }

            const highestHIndexModel: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
                'Co-authors with highest h-index',
                '',
                ViewName.LineColumnsMixedChartCard,
                3,
                series,
                'h-index',
                'Publications',
                ['Publications', 'h-index'],
            );
            rowModel.simpleCardModels.push(highestHIndexModel);
        });
        this._rowModels.push(rowModel);
    }

    /**
     * Creates citations and expertise rows.
     * @returns - RowModel containing the citations and expertise models
     */
    private createCitationsExpertiseRow(): void {
        const cerRow: RowModel = new RowModel(12);
        const series: Array<Series> = new Array<Series>();

        this.fullProfiles.forEach((profile: FullProfile) => {
            series.push(
                new Series(profile.basicProfile.name, [
                    profile.basicProfile.totalCitations -
                        profile.selfCitationsCount -
                        profile.indirectSelfCitationsCount,
                    profile.selfCitationsCount,
                    profile.indirectSelfCitationsCount,
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
        this.rowModels.push(cerRow);
    }
}
