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
import { RangeButton, ShowingButton } from '../models/inputs/PopupEditButton';
import { PublicationByYear } from '../models/profile/Profile';
import { Expertise, ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';

/**
 * Represents page width constant with a value of 12
 */
const PAGE_WIDTH: number = 12;

/**
 * Type defining the following data for each card:
 * title
 * row number
 * default number of entries
 */
type cardData = {
    TITLE: string;
    ROW: number;
    DEFAULT_NUM_OF_ENTRIES?: number;
};

/**
 * Possible types of cards using type cardData:
 * publications by year, publications by venue, citations by year, most cited scholars,
 * citations, most frequent co-authors, co-authors with highest h-index, expertise
 */
type cards = {
    PUBLICATIONS_BY_YEAR: {
        CARD_DATA: cardData;
    };
    PUBLICATIONS_BY_VENUE: {
        CARD_DATA: cardData;
    };
    CITATIONS_BY_YEAR: {
        CARD_DATA: cardData;
    };
    MOST_CITED_SCHOLARS: {
        CARD_DATA: cardData;
    };
    CITATIONS: {
        CARD_DATA: cardData;
    };
    MOST_FREQUENT_CO_AUTHORS: {
        CARD_DATA: cardData;
    };
    CO_AUTHORS_WITH_HIGHEST_HINDEX: {
        CARD_DATA: cardData;
    };
    EXPERTISE: {
        CARD_DATA: cardData;
    };
};

/**
 * Cards constant defining each type of card and their card data which includes their title, row number and default number of entries
 */
const CARDS: cards = {
    PUBLICATIONS_BY_YEAR: {
        CARD_DATA: {
            TITLE: 'Publications by year',
            ROW: 1,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    PUBLICATIONS_BY_VENUE: {
        CARD_DATA: {
            TITLE: 'Publications by venue',
            ROW: 1,
            DEFAULT_NUM_OF_ENTRIES: 3,
        },
    },
    CITATIONS_BY_YEAR: {
        CARD_DATA: {
            TITLE: 'Citations by year',
            ROW: 1,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    MOST_CITED_SCHOLARS: {
        CARD_DATA: {
            TITLE: 'Most cited scholars',
            ROW: 2,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    CITATIONS: {
        CARD_DATA: {
            TITLE: 'Citations',
            ROW: 2,
        },
    },
    MOST_FREQUENT_CO_AUTHORS: {
        CARD_DATA: {
            TITLE: 'Most frequent co-authors',
            ROW: 2,
            DEFAULT_NUM_OF_ENTRIES: 5,
        },
    },
    CO_AUTHORS_WITH_HIGHEST_HINDEX: {
        CARD_DATA: {
            TITLE: 'Co-authors with highest h-index',
            ROW: 3,
            DEFAULT_NUM_OF_ENTRIES: 5,
        },
    },
    EXPERTISE: {
        CARD_DATA: {
            TITLE: 'Expertise',
            ROW: 3,
            DEFAULT_NUM_OF_ENTRIES: 50,
        },
    },
};

/**
 * Builds the data structure that will be given to ComparePage.
 */
export class ComparisonRepresentation 
{
    /**
     * Represtents fullProfiles to be displayed in the comparison.
     */
    private _fullProfiles: FullProfile[];

    /**
     * Represtents rows to be displayed in the comparison.
     */
    private _rowModels: RowModel[];

    /**
     *  Constructs the ComparisonRepresentation
     * @param _fullProfiles - FullProfiles present in the ComparePage
     */
    constructor(_fullProfiles: FullProfile[]) 
    {
        this._fullProfiles = _fullProfiles;
        this._rowModels = new Array<RowModel>();
    }

    /**
     * Updates the rows of ComparePage.
     * @returns void
     */
    renderComparison(): void 
    {
        if (this._fullProfiles.length === 0) 
        {
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
    public get rowModels(): RowModel[] 
    {
        return this._rowModels;
    }

    /**
     * Setter method of RowModel list.
     */
    public set rowModels(rowModels: RowModel[]) 
    {
        this._rowModels = rowModels;
    }

    /**
     * Adds a row into the RowModel list.
     * @param rowModel - Rowmodel to push
     */
    public pushRow(rowModel: RowModel): void 
    {
        this._rowModels.push(rowModel);
    }

    /**
     * Getter method of the fullProfiles
     */
    public get fullProfiles(): FullProfile[] 
    {
        return this._fullProfiles;
    }

    /**
     * Setter method of the fullProfiles
     */
    public set fullProfiles(fullProfile: FullProfile[]) 
    {
        this._fullProfiles = fullProfile;
    }

    /**
     * Getter method of the summary width
     */
    public getSummaryWidth(): number 
    {
        return PAGE_WIDTH / this._fullProfiles.length;
    }

    /**
     * Creates a row that will display publications by year card which is to be rendered on the gui
     * This row also includes from, to and range filters.
     */
    private createPublicationByYearRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const tempYearSeries: Array<Series> = new Array<Series>();

        for (let i: number = 0; i < this._fullProfiles.length; i++) 
        {
            this._fullProfiles[i].publicationsByYear.forEach((pby: PublicationByYear) => 
            {
                const serie: Series = new Series(pby.year + '', new Array(this._fullProfiles.length).fill(0));
                serie.data[i] = pby.publicationsCount;
                tempYearSeries.push(serie);
            });
        }
        const yearSeries: Array<Series> = [];

        tempYearSeries.forEach((serie: Series) => 
        {
            const temp: Array<Series> = new Array<Series>();
            for (const currTmpYearsSeries of tempYearSeries) 
            {
                if (currTmpYearsSeries.name === serie.name) 
                {
                    temp.push(currTmpYearsSeries);
                }
            }
            if (temp.length > 1) 
            {
                const data: Array<Array<number>> = [];
                for (let i: number = 0; i < temp.length; i++) 
                {
                    data.push(temp[i].data);
                }
                const newData: Array<number> = data[0].map((x: number, idx: number) =>
                    data.reduce((sum: number, curr: Array<number>) => sum + curr[idx], 0),
                );
                const newSeries: Series = new Series(temp[0].name, newData);
                if (yearSeries.filter((yearSerie: Series) => yearSerie.name === newSeries.name).length === 0) 
                {
                    yearSeries.push(newSeries);
                }
            }
            else 
            {
                const newSeries: Series = new Series(temp[0].name, temp[0].data);
                yearSeries.push(newSeries);
            }
        });

        const profileName: string[] = new Array<string>();
        for (const profile of this._fullProfiles) 
        {
            profileName.push(profile.basicProfile.name);
        }
        const yearModel: BasicColumnsChartModel = new BasicColumnsChartModel(
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.TITLE,
            '',
            ViewName.BasicColumnsChartCard,
            PAGE_WIDTH,
            yearSeries,
            'Years',
            'Number of publications',
            profileName,
        );
        yearModel.series = yearModel.series.sort(this.sortSeries);

        const lastValue: number = +yearModel.series[yearModel.series.length - 1]?.name;
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(
            lastValue - CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            lastValue - CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
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

    /**
     * Creates a row that will display publications by venue card which is to be rendered on the gui
     * This row also includes showing and scale filters.
     */
    private createPublicationByVenueRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);

        const models: DistributedColumnsChartModel[] = [];
        const showing: Filter<number, StackedColumnsChartModel> = new ShowingFilter(
            CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        this._fullProfiles.forEach((profile: FullProfile) => 
        {
            const series: Array<Series> = new Array<Series>();
            for (const pbv of profile.publicationsByVenue) 
            {
                series.push(new Series(pbv.venue, [pbv.publicationCount]));
            }

            const venus: string[] = [];
            for (const pbv of profile.publicationsByVenue) 
            {
                venus.push(pbv.venue);
            }
            const model: DistributedColumnsChartModel = new DistributedColumnsChartModel(
                CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.TITLE,
                profile.basicProfile.name,
                ViewName.DistributedColumnsChartCard,
                PAGE_WIDTH / this._fullProfiles.length,
                series,
                'Venues',
                'Number of publications',
                venus,
            );
            model.filters = [showing];
            models.push(model);
        });

        rowModel.simpleCardModels.push(...models);

        const showingNumberField: Field<number, BasicColumnsChartModel> = new Field<number, BasicColumnsChartModel>(
            'showing',
            CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
            showing,
            models,
        );

        const scale: Filter<boolean, ChartOptionsModel> = new ScaleUpFilter(false);
        const showingPopupEdit: RangeButton = new RangeButton('range', [showingNumberField]);
        const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel(models);
        chartOptionsModel.filters = [scale];

        models.forEach((model: ObjectSeriesChartModel) => 
        {
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            false,
            scale,
            [chartOptionsModel],
        );
        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];
        showing.value = CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.DEFAULT_NUM_OF_ENTRIES;
        for (const model of models) 
        {
            model.applyAllFilters();
        }
        this._rowModels.push(rowModel);
    }

    /**
     * Creates a row that will display citations by year card which is to be rendered on the gui
     * This row also includes from, to, from number and to number filters.
     */
    private createCitationsByYearRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);

        const models: StackedColumnsChartModel[] = [];

        let min: number = Number.MAX_SAFE_INTEGER;
        let max: number = 0;
        this._fullProfiles.forEach((profile: FullProfile) => 
        {
            const series: Array<Series> = new Array<Series>();
            for (const cby of profile.citationsByYear) 
            {
                const isc: number = cby.indirectSelfCitationsCount;
                const sc: number = cby.selfCitationCount;
                const cbo: number = cby.totalCitationsCount - isc - sc;
                series.push(new Series(cby.year + '', [isc, sc, cbo]));
                if (+cby.year < min) min = +cby.year;
                if (+cby.year > max) max = +cby.year;
            }
            const model: StackedColumnsChartModel = new StackedColumnsChartModel(
                CARDS.CITATIONS_BY_YEAR.CARD_DATA.TITLE,
                profile.basicProfile.name,
                ViewName.StackedColumnsChartCard,
                PAGE_WIDTH / this._fullProfiles.length,
                series,
                'Years',
                'Number of citations',
                ['indirect self-citations', 'self-citations', 'cited by others'],
            );
            model.series.sort(this.sortSeries);
            models.push(model);
        });

        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(
            max - CARDS.CITATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(max);

        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            max - CARDS.CITATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
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

        models.forEach((model: ObjectSeriesChartModel) => 
        {
            model.filters = [fromFilter, toFilter];
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            false,
            scale,
            [chartOptionsModel],
        );

        rowModel.popupButtons = [rangePopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];

        for (const model of models) 
        {
            model.applyAllFilters();
        }
        rowModel.simpleCardModels.push(...models);
        this._rowModels.push(rowModel);
    }

    /**
     * Creates a row that will display most frequent co-author card which is to be rendered on the gui
     * This row also includes showing and scale filters.
     */
    private createMostFrequentCoAuthorsRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);

        const models: BasicBarsChartModel[] = [];
        const showing: Filter<number, BasicBarsChartModel> = new ShowingFilter(
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const scale: Filter<boolean, ChartOptionsModel> = new ScaleUpFilter(false);

        this._fullProfiles.forEach((profile: FullProfile) => 
        {
            const series: Array<Series> = new Array<Series>();
            for (const author of profile.authors) 
            {
                series.push(new Series(author.name, [author.jointPublicationCount]));
            }
            const sortedSeries: Array<Series> = series.sort(this.sortSeriesByData);
            const model: BasicBarsChartModel = new BasicBarsChartModel(
                CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.TITLE,
                '',
                ViewName.BasicBarsChartCard,
                PAGE_WIDTH / this._fullProfiles.length,
                sortedSeries,
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

        models.forEach((model: ObjectSeriesChartModel) => 
        {
            model.chartOptionsModel = chartOptionsModel;
        });

        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
            showing,
            models,
        );

        const showingPopupEdit: RangeButton = new RangeButton('range', [showingNumberField]);
        const scalingCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest entries',
            false,
            scale,
            [chartOptionsModel],
        );
        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingCheckBox];
        rowModel.popupButtons = [showingPopupEdit];
        showing.value = CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES;
        for (const model of models) 
        {
            model.applyAllFilters();
        }
        this._rowModels.push(rowModel);
    }

    /**
     * Creates a row that will display  co-authors with highest h-index card which is to be rendered on the gui
     * This row also includes scale according to h-index, scale according to publication number and showing filters.
     */
    private createCoAuthorsWithHighestHIndexRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);

        const models: LineColumnsMixedChartModel[] = [];
        const showing: Filter<number, BasicBarsChartModel> = new ShowingFilter(CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.DEFAULT_NUM_OF_ENTRIES);

        let min: number = Number.MAX_SAFE_INTEGER;
        let max: number = 0;
        this._fullProfiles.forEach((profile: FullProfile) => 
        {
            const series: Array<Series> = new Array<Series>();
            for (const author of profile.authors) 
            {
                series.push(new Series(author.name, [author.hIndex], 'line'));
                series.push(new Series(author.name, [author.jointPublicationCount], 'column'));
                if (author.hIndex < min) min = author.hIndex;
                if (author.hIndex > max) max = author.hIndex;
            }

            const model: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
                CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.TITLE,
                profile.basicProfile.name,
                ViewName.LineColumnsMixedChartCard,
                PAGE_WIDTH / this._fullProfiles.length,
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

        models.forEach((model: ObjectSeriesChartModel) => 
        {
            model.filters = [showing];
            model.chartOptionsModel = chartOptionsModel;
        });

        const scalingPublicationCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest publication count',
            false,
            scalePublication,
            [chartOptionsModel],
        );
        scalingPublicationCheckBox.data = [chartOptionsModel];

        const scalingHIndexCheckBox: CheckBox<ChartOptionsModel> = new CheckBox(
            'Scale up number of publications according to the scholar with highest h-index',
            false,
            scaleHIndex,
            [chartOptionsModel],
        );

        const showingNumberField: Field<number, LineColumnsMixedChartModel> = new Field<number, LineColumnsMixedChartModel>(
            'showing',
            CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
            showing,
            models,
        );
        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);

        rowModel.popupButtons = [showingPopupEdit];
        rowModel.checkBoxes = [scalingPublicationCheckBox, scalingHIndexCheckBox];

        for (const model of models) 
        {
            model.applyAllFilters();
        }

        rowModel.simpleCardModels.push(...models);

        this._rowModels.push(rowModel);
    }

    /**
     * Creates a row that will display citations and expertise cards which is to be rendered on the gui
     */
    private createCitationsExpertiseRow(): void 
    {
        const cerRow: RowModel = new RowModel(PAGE_WIDTH);
        const series: Array<Series> = new Array<Series>();

        this.fullProfiles.forEach((profile: FullProfile) => 
        {
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
        this.fullProfiles.forEach((profile: FullProfile) => 
        {
            labels.push(profile.basicProfile.name);
        });

        const stackedColumns100ChartModel: StackedColumns100ChartModel = new StackedColumns100ChartModel(
            CARDS.CITATIONS.CARD_DATA.TITLE,
            '',
            ViewName.StackedColumns100ChartCard,
            PAGE_WIDTH / 2,
            series,
            'Scholar Names',
            '',
            labels,
        );
        cerRow.simpleCardModels.push(stackedColumns100ChartModel);

        const expertise: Expertise[] = new Array<Expertise>();
        for (const fp of this._fullProfiles) 
        {
            expertise.push(new Expertise(fp.basicProfile.name, fp.expertise));
        }

        const expertiseModel: ExpertiseModel = new ExpertiseModel(
            expertise,
            CARDS.EXPERTISE.CARD_DATA.TITLE,
            '',
            ViewName.ExpertiseCard,
            PAGE_WIDTH / 2,
        );
        cerRow.simpleCardModels.push(expertiseModel);

        this.rowModels.push(cerRow);
    }

    /**
     * Sorts the given series according to their names in ascending order.
     * @param a - the first series to be sorted
     * @param b - the second series to be sorted
     * @returns the sorted series
     */
    private sortSeries(a: Series, b: Series): number 
    {
        if (+a.name < +b.name) return -1;
        if (+a.name > +b.name) return 1;
        return 0;
    }

    /**
     * Sorts the given series' data in ascending order.
     * @param a - the first series whose data is to be sorted
     * @param b - the second series whose data is to be sorted
     * @returns the sorted series data
     */
    private sortSeriesByData(a: Series, b: Series): number 
    {
        if (+a.data[0] > +b.data[0]) return -1;
        if (+a.data[0] < +b.data[0]) return 1;
        return 0;
    }
}
