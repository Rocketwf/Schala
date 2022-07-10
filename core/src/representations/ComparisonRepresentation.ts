import { Filter } from '../filters';
import { ScaleUpFilter, ScaleUpMixedFilter, TypeName } from '../filters/chartoptionsfilters/ChartOptionFilter';
import { FromFilter, ShowingFilter, ToFilter } from '../filters/objectserieschartfilters/ObjectSeriesFilter';
import {
    BasicBarsChartModel,
    BasicColumnsChartModel,
    ChartOptionsModel,
    DistributedColumnsChartModel,
    Field,
    FullProfile,
    LineColumnsMixedChartModel,
    ObjectSeriesChartModel,
    RowModel,
    Series,
    StackedColumns100ChartModel,
    StackedColumnsChartModel,
    ViewName,
} from '../models';
import { CheckBox } from '../models/inputs/Inputs';
import { RangeButton } from '../models/inputs/PopupEditButton';
import { PublicationByVenue, PublicationByYear } from '../models/profile/Profile';
import { Expertise, ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';

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
        if (this._fullProfiles.length === 0) {
            this._rowModels = [];
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

    public getSummaryWidth(): number {
        return 12 / this._fullProfiles.length;
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
        yearModel.series = yearModel.series.sort(this.sortSeries);

        const lastValue: number = +yearModel.series[yearModel.series.length - 1]?.name;
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(lastValue - 10);
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            lastValue - 10,
            fromFilter,
            [yearModel],
        );

        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(lastValue);
        const toNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'to',
            lastValue,
            toFilter,
            [yearModel],
        );

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        yearModel.popupButtons = [rangePopupEdit];
        yearModel.filters = [fromFilter, toFilter];
        yearModel.applyAllFilters();
        rowModel.simpleCardModels.push(yearModel);
        this._rowModels.push(rowModel);
    }

    private createPublicationByVenueRow(): void {
        const rowModel: RowModel = new RowModel(12);

        const models: DistributedColumnsChartModel[] = [];
        const showing: Filter<number, StackedColumnsChartModel> = new ShowingFilter(10);
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const pbv of profile.publicationsByVenue) {
                series.push(new Series(pbv.venue, [pbv.publicationCount]));
            }

            const model: DistributedColumnsChartModel = new DistributedColumnsChartModel(
                'Publications by venue',
                '',
                ViewName.DistributedColumnsChartCard,
                12 / this._fullProfiles.length,
                series,
                'Venues',
                'Number of publications',
                profile.publicationsByVenue.map((pbv: PublicationByVenue) => pbv.venue),
            );
            model.filters = [showing];
            models.push(model);
        });

        rowModel.simpleCardModels.push(...models);

        const showingNumberField: Field<number, BasicColumnsChartModel> = new Field<number, BasicColumnsChartModel>(
            'showing',
            10,
            showing,
            models,
        );

        const scale: Filter<boolean, ChartOptionsModel> = new ScaleUpFilter(false);
        const showingPopupEdit: RangeButton = new RangeButton('range', [showingNumberField]);
        const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel(models);
        chartOptionsModel.filters = [scale];

        models.forEach((model: ObjectSeriesChartModel) => {
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            'scale',
            false,
            scale,
        );
        scalingCheckBox.data = [chartOptionsModel];
        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];
        showing.value = 10;
        for (const model of models) {
            model.applyAllFilters();
        }
        this._rowModels.push(rowModel);
    }

    private createCitationsByYearRow(): void {
        const rowModel: RowModel = new RowModel(12);

        const models: StackedColumnsChartModel[] = [];

        let min: number = Number.MAX_SAFE_INTEGER;
        let max: number = 0;
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const cby of profile.citationsByYear) {
                const isc: number = cby.indirectSelfCitationsCount;
                const sc: number = cby.selfCitationCount;
                const cbo: number = cby.totalCitationsCount - isc - sc;
                series.push(new Series(cby.year + '', [isc, sc, cbo]));
                if (+cby.year < min) min = +cby.year;
                if (+cby.year > max) max = +cby.year;
            }
            const model: StackedColumnsChartModel = new StackedColumnsChartModel(
                'Citations by year',
                '',
                ViewName.StackedColumnsChartCard,
                12 / this._fullProfiles.length,
                series,
                'Years',
                'Number of citations',
                ['indirect self-citations', 'self-citations', 'cited by others'],
            );
            model.series.sort(this.sortSeries);
            models.push(model);
        });

        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(max - 10);
        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(max);

        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            max - 10,
            fromFilter,
            models,
        );

        const toNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'to',
            max,
            toFilter,
            models,
        );

        const scale: Filter<boolean, ChartOptionsModel> = new ScaleUpFilter(false);

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel(models);
        chartOptionsModel.filters = [scale];

        models.forEach((model: ObjectSeriesChartModel) => {
            model.filters = [fromFilter, toFilter];
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            'scale',
            false,
            scale,
        );
        scalingCheckBox.data = [chartOptionsModel];

        rowModel.popupButtons = [rangePopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];

        for (const model of models) {
            model.applyAllFilters();
        }
        rowModel.simpleCardModels.push(...models);
        this._rowModels.push(rowModel);
    }

    private createMostFrequentCoAuthorsRow(): void {
        const rowModel: RowModel = new RowModel(12);

        const models: BasicBarsChartModel[] = [];
        const showing: Filter<number, BasicBarsChartModel> = new ShowingFilter(10);
        const scale: Filter<boolean, ChartOptionsModel> = new ScaleUpFilter(false);

        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const author of profile.authors) {
                series.push(new Series(author.name, [author.jointPublicationCount]));
            }
            const model: BasicBarsChartModel = new BasicBarsChartModel(
                'Most frequent co-authors',
                '',
                ViewName.BasicBarsChartCard,
                12 / this._fullProfiles.length,
                series,
                'Number of co-authored publication',
                '',
                [],
            );
            model.filters = [showing];
            models.push(model);
        });
        rowModel.simpleCardModels.push(...models);

        const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel(models);
        chartOptionsModel.filters = [scale];

        models.forEach((model: ObjectSeriesChartModel) => {
            model.chartOptionsModel = chartOptionsModel;
        });

        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicColumnsChartModel>(
            'showing',
            10,
            showing,
            models,
        );

        const showingPopupEdit: RangeButton = new RangeButton('range', [showingNumberField]);
        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            'scale',
            false,
            scale,
        );
        scalingCheckBox.data = [chartOptionsModel];
        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];
        rowModel.popupButtons = [showingPopupEdit];
        showing.value = 10;
        for (const model of models) {
            model.applyAllFilters();
        }
        this._rowModels.push(rowModel);
    }

    private createCoAuthorsWithHighestHIndexRow(): void {
        const rowModel: RowModel = new RowModel(12);

        const models: LineColumnsMixedChartModel[] = [];
        const showing: Filter<number, BasicBarsChartModel> = new ShowingFilter(5);

        let min: number = Number.MAX_SAFE_INTEGER;
        let max: number = 0;
        this._fullProfiles.forEach((profile: FullProfile) => {
            const series: Array<Series> = new Array<Series>();
            for (const author of profile.authors) {
                series.push(new Series(author.name, [author.hIndex], 'line'));
                series.push(new Series(author.name, [author.jointPublicationCount], 'column'));
                if (author.hIndex < min) min = author.hIndex;
                if (author.hIndex > max) max = author.hIndex;
            }

            const model: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
                'Co-authors with highest h-index',
                '',
                ViewName.LineColumnsMixedChartCard,
                12 / this._fullProfiles.length,
                series,
                'h-index',
                'Publications',
                ['Publications', 'h-index'],
            );
            models.push(model);
        });

        const scaleHIndex: Filter<boolean, ChartOptionsModel> = new ScaleUpMixedFilter(false, TypeName.Line);
        const scalePublication: Filter<boolean, ChartOptionsModel> = new ScaleUpMixedFilter(false, TypeName.Column);

        const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel(models);
        chartOptionsModel.filters = [scaleHIndex, scalePublication];

        models.forEach((model: ObjectSeriesChartModel) => {
            model.filters = [showing];
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingPublicationCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest publication count',
            'scale',
            false,
            scalePublication,
        );
        scalingPublicationCheckBox.data = [chartOptionsModel];

        const scalingHIndexCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest h-index',
            'scale',
            false,
            scaleHIndex,
        );
        scalingHIndexCheckBox.data = [chartOptionsModel];

        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicColumnsChartModel>(
            'showing',
            5,
            showing,
            models,
        );
        const showingPopupEdit: RangeButton = new RangeButton('showing', [showingNumberField]);

        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingPublicationCheckBox, scalingHIndexCheckBox];

        for (const model of models) {
            model.applyAllFilters();
        }

        rowModel.simpleCardModels.push(...models);

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

        const expertise: Expertise[] = new Array<Expertise>();
        for (const fp of this._fullProfiles) {
            expertise.push(new Expertise(fp.basicProfile.name, fp.expertise));
        }

        const expertiseModel: ExpertiseModel = new ExpertiseModel(
            expertise,
            'Expertise',
            '',
            ViewName.ExpertiseCard,
            6,
        );
        cerRow.simpleCardModels.push(expertiseModel);

        this.rowModels.push(cerRow);
    }
    private sortSeries(a: Series, b: Series): number {
        if (+a.name < +b.name) return -1;
        if (+a.name > +b.name) return 1;
        return 0;
    }
}
