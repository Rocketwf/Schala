import { ArticlesModel } from './../models/articlesmodel/ArticlesModel';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import {
    BasicBarsChartModel,
    DistributedColumnsChartModel,
    LineColumnsMixedChartModel,
    PieChartModel,
    Series,
    StackedColumnsChartModel,
    Field,
    ViewName,
} from '../models';
import { Expertise, ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';
import { PublicationByVenue, PublicationByYear } from '../models/profile/Profile';
import { RangeButton, ShowingButton } from '../models/inputs/PopupEditButton';
import { Filter } from '../filters';
import { FromFilter, ShowingFilter, ToFilter } from '../filters/objectserieschartfilters/ObjectSeriesFilter';
export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this._rowModels = [];
        this.createFirstRow();
        this.createSecondRow();
        this.createThirdRow();
        this.createFourthRow();
    }

    public get fullProfile(): FullProfile {
        return this._fullProfile;
    }
    public set fullProfile(fullProfile: FullProfile) {
        this._fullProfile = fullProfile;
    }
    public get rowModels(): RowModel[] {
        return this._rowModels;
    }

    private createPublicationsByYearCard(): DistributedColumnsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const pby of this._fullProfile.publicationsByYear) {
            series.push(new Series(pby.year + '', [pby.publicationsCount]));
        }
        const pby: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            'Publications by year',
            '',
            ViewName.DistributedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of publications',
            this._fullProfile.publicationsByYear.map((pby: PublicationByYear) => pby.year + ''),
        );

        const firstValue: number = +pby.series[0]?.name;
        const fromFilter: Filter<number, DistributedColumnsChartModel> = new FromFilter(firstValue);
        const fromNumberField: Field<number, DistributedColumnsChartModel> = new Field<
            number,
            DistributedColumnsChartModel
        >('from', firstValue, fromFilter);

        const lastValue: number = +pby.series[pby.series.length - 1]?.name;
        const toFilter: Filter<number, DistributedColumnsChartModel> = new ToFilter(lastValue);
        const toNumberField: Field<number, DistributedColumnsChartModel> = new Field<
            number,
            DistributedColumnsChartModel
        >('to', lastValue, toFilter);

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        pby.popupButtons = [rangePopupEdit];
        pby.filters = [fromFilter, toFilter];
        return pby;
    }

    private createPublicationsByVenueCard(): DistributedColumnsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const pbv of this._fullProfile.publicationsByVenue) {
            series.push(new Series(pbv.venue, [pbv.publicationCount]));
        }

        return new DistributedColumnsChartModel(
            'Publications by venue',
            '',
            ViewName.DistributedColumnsChartCard,
            2,
            series,
            'Venues',
            'Number of publications',
            this._fullProfile.publicationsByVenue.map((pbv: PublicationByVenue) => pbv.venue),
        );
    }

    private createMostCitedScholarsCard(): BasicBarsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const cs of this._fullProfile.citedScholars) {
            series.push(new Series(cs.name, [cs.citationsCount]));
        }
        const mcs: BasicBarsChartModel = new BasicBarsChartModel(
            'Most cited scholars',
            '',
            ViewName.BasicBarsChartCard,
            4,
            series,
            'Number of citations',
            '',
            [],
        );

        const firstValue: number = 5;
        const showingFilter: Filter<number, BasicBarsChartModel> = new ShowingFilter(firstValue);
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            firstValue,
            showingFilter,
        );

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        mcs.popupButtons = [showingPopupEdit];
        mcs.filters = [showingFilter];
        showingPopupEdit.handleAll([mcs]);

        return mcs;
    }

    private createMostFrequentCoAuthorsCard(): BasicBarsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const author of this._fullProfile.authors) {
            series.push(new Series(author.name, [author.jointPublicationCount]));
        }
        const mfa: BasicBarsChartModel = new BasicBarsChartModel(
            'Most frequent co-authors',
            '',
            ViewName.BasicBarsChartCard,
            4,
            series,
            'Number of co-authored publication',
            '',
            [],
        );

        const firstValue: number = 5;
        const showingFilter: Filter<number, BasicBarsChartModel> = new ShowingFilter(firstValue);
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            firstValue,
            showingFilter,
        );

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        mfa.popupButtons = [showingPopupEdit];
        mfa.filters = [showingFilter];
        showingPopupEdit.handleAll([mfa]);

        return mfa;
    }

    private createCitationsByYearCard(): StackedColumnsChartModel {
        let series: Array<Series> = new Array<Series>();
        for (const cby of this._fullProfile.citationsByYear) {
            const isc: number = cby.indirectSelfCitationsCount;
            const sc: number = cby.selfCitationCount;
            const cbo: number = cby.totalCitationsCount - isc - sc;
            series.push(new Series(cby.year + '', [isc, sc, cbo]));
        }
        series = series.sort(this.sortSeries);
        const cby: StackedColumnsChartModel = new StackedColumnsChartModel(
            'Citations by year',
            '',
            ViewName.StackedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );

        const firstValue: number = +cby.series[0]?.name;
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(firstValue);
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            firstValue,
            fromFilter,
        );

        const lastValue: number = +cby.series[cby.series.length - 1]?.name;
        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(lastValue);
        const toNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'to',
            lastValue,
            toFilter,
        );

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        cby.popupButtons = [rangePopupEdit];
        cby.filters = [fromFilter, toFilter];

        return cby;
    }

    private createExpertiseCard(): ExpertiseModel {
        const expertise: Expertise = new Expertise(this._fullProfile.basicProfile.name, this._fullProfile.expertise);
        return new ExpertiseModel([expertise], 'Expertise', '', ViewName.ExpertiseCard, 5);
    }

    private createArticlesCard(): ArticlesModel {
        const articlesModel: ArticlesModel = new ArticlesModel(
            this.fullProfile.articles,
            'All Articles',
            '',
            ViewName.ArticlesCard,
            10,
        );
        return articlesModel;
    }

    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations -
                    this._fullProfile.selfCitationsCount -
                    this._fullProfile.indirectSelfCitationsCount,
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.selfCitationsCount]));
        series.push(new Series('indirect self-citations', [this._fullProfile.indirectSelfCitationsCount]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
    }

    private createCoAuthorsWithHighestHIndexCard(): LineColumnsMixedChartModel {
        const series: Array<Series> = new Array<Series>();

        for (const author of this._fullProfile.authors) {
            series.push(new Series(author.name, [author.hIndex], 'line'));
            series.push(new Series(author.name, [author.jointPublicationCount], 'column'));
        }

        return new LineColumnsMixedChartModel(
            'Co-authors with highest h-index',
            '',
            ViewName.LineColumnsMixedChartCard,
            5,
            series,
            'h-index',
            'Publications',
            ['Publications', 'h-index'],
        );
    }

    //This method creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createPublicationsByYearCard());
        rowModel.simpleCardModels.push(this.createPublicationsByVenueCard());
        rowModel.simpleCardModels.push(this.createCitationsByYearCard());
        this.rowModels.push(rowModel);
    }
    //This method creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frequent co-authors
    private createSecondRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createMostCitedScholarsCard());
        rowModel.simpleCardModels.push(this.createCitationsCard());
        rowModel.simpleCardModels.push(this.createMostFrequentCoAuthorsCard());
        this.rowModels.push(rowModel);
    }

    //This method creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createThirdRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createCoAuthorsWithHighestHIndexCard());
        rowModel.simpleCardModels.push(this.createExpertiseCard());
        this._rowModels.push(rowModel);
    }

    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createArticlesCard());
        this._rowModels.push(rowModel);
    }

    private sortSeries(a: Series, b: Series): number {
        if (+a.name < +b.name) return -1;
        if (+a.name > +b.name) return 1;
        return 0;
    }
}
