import { ArticlesModel } from './../models/articlesmodel/ArticlesModel';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import {
    BasicBarsChartModel,
    DistributedColumnsChartModel,
    LineColumnsMixedChartModel,
    ObjectSeriesChartModel,
    PieChartModel,
    Series,
    StackedColumnsChartModel,
    ViewName,
} from '../models';
import { ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';
import { PublicationByVenue, PublicationByYear } from '../models/profile/Profile';
export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this.createFirstRow();
        this.createSecondRow();
        this.createThirdRow();
        // this.createFourthRow();
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
        return new DistributedColumnsChartModel(
            'Publications by year',
            '',
            ViewName.DistributedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of publications',
            this._fullProfile.publicationsByYear.map((pby: PublicationByYear) => pby.year + ''),
        );
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
        return new BasicBarsChartModel(
            'Most cited scholars',
            '',
            ViewName.BasicBarsChartCard,
            4,
            series,
            'Number of citations',
            '',
            [],
        );
    }

    private createMostFrequentCoAuthorsCard(): BasicBarsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const author of this._fullProfile.authors) {
            series.push(new Series(author.name, [author.jointPublicationCount]));
        }
        return new BasicBarsChartModel(
            'Most frequent co-authors',
            '',
            ViewName.BasicBarsChartCard,
            4,
            series,
            'Number of co-authored publication',
            '',
            [],
        );
    }

    private createCitationsByYearCard(): StackedColumnsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const cby of this._fullProfile.citationsByYear) {
            const isc: number = cby.indirectSelfCitationsCount;
            const sc: number = cby.selfCitationCount;
            const cbo: number = cby.totalCitationsCount - isc - sc;
            series.push(new Series(cby.year + '', [isc, sc, cbo]));
        }
        return new StackedColumnsChartModel(
            'Citations by year',
            '',
            ViewName.StackedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );
    }

    private createExpertiseCard(): ExpertiseModel {
        return new ExpertiseModel(this._fullProfile.expertise, 'Expertise', '', ViewName.ExpertiseCard, 5);
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
        // rowModel.simpleCardModels.push(this.createExpertiseCard());
        this._rowModels.push(rowModel);
    }

    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        const rowModel: RowModel = new RowModel(10);
        // rowModel.simpleCardModels.push(this.createArticlesCard());
        this._rowModels.push(rowModel);
    }
}
