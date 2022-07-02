import { FullProfile, Citations } from '../models/profile';
import { Author } from '../models/articles';
import { RowModel } from '../models/viewmodels';
import {
    ArticlesModel,
    PieChartModel,
    Series,
    ObjectSeriesChartModel,
    StackedColumnsChartModel,
    LineColumnsMixedChartModel,
} from '../models';
import { ViewName } from '../models/simplecardmodel/SimpleCardModel';
import { ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';

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

    private createPublicationsByYearCard(): ObjectSeriesChartModel {
        return null;
    }

    private createPublicationsByVenueCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostCitedScholarsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostFrequentCoAuthorsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createExpertiseCard(): ExpertiseModel {
        return null;
    }

    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations -
                    this._fullProfile.getSelfCitationsCount() -
                    this._fullProfile.getIndirectSelfCitationsCount(),
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.getSelfCitationsCount()]));
        series.push(new Series('indirect self-citations', [this._fullProfile.getIndirectSelfCitationsCount()]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
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

    /**
     * Creates line columns mixed chart card.
     * @returns - LineColumnsMixedChartModel
     */
    private createCoAuthorsWithHighestHIndexCard(): LineColumnsMixedChartModel {
        const series: Array<Series> = new Array<Series>();
        const authorsCount: Map<Author, number> = new Map<Author, number>();

        for (const art of this._fullProfile.articles) {
            for (const author of art.authors) {
                if (author.id === this._fullProfile.basicProfile.id) continue;
                let found: boolean = false;
                for (const savedAuthor of Array.from(authorsCount.keys())) {
                    if (author.id === savedAuthor.id) {
                        authorsCount.set(savedAuthor, authorsCount.get(savedAuthor) + 1);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    authorsCount.set(author, 1);
                }
            }
        }
        console.log(authorsCount);
        for (const [author, count] of authorsCount) {
            series.push(new Series(author.name, [author.hIndex], 'line'));
            series.push(new Series(author.name, [count], 'column'));
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
        this.rowModels.push(new RowModel(10));
        const pby: PieChartModel = this.createCitationsCard();
        const cby: ObjectSeriesChartModel = this.createCitationByYearCard();

        this.rowModels[0].simpleCardModels.push(cby);
        this.rowModels[0].simpleCardModels.push(pby);
    }
    //This method creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frquent co-authors
    private createSecondRow(): void {
        return;
    }
    //This method creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createThirdRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createCoAuthorsWithHighestHIndexCard());
        this._rowModels.push(rowModel);
    }
    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        this.rowModels.push(new RowModel(10));
        const art: ArticlesModel = this.createArticlesCard();
        this.rowModels[1].simpleCardModels.push(art);
    }
    private createCitationByYearCard(): ObjectSeriesChartModel {
        const series: Series[] = new Array<Series>();
        this._fullProfile.citations.forEach((citations: Citations, year: number) => {
            series.push(
                new Series(year + '', [
                    citations.indirectSelfCitationsCount,
                    citations.selfCitationsCount,
                    citations.totalCitationsCount - citations.selfCitationsCount - citations.indirectSelfCitationsCount,
                ]),
            );
        });
        const objectSeriesChartModel: ObjectSeriesChartModel = new StackedColumnsChartModel(
            'Citation by year',
            '',
            ViewName.StackedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citation', 'self-citations', 'cited by others'],
        );

        return objectSeriesChartModel;
    }
}
