import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { ArticlesModel, PieChartModel } from '../models';
import { ViewName } from '../models/simplecardmodel/SimpleCardModel';
import { ObjectSeriesChartModel, Series } from '../models/objectserieschartmodel/ObjectSeriesChartModel';
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

    private createCoAuthorsWithHighestHIndexCard(): ObjectSeriesChartModel {
        return null;
    }

    private createExpertiseCard(): ExpertiseModel {
        return null;
    }

    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations - this._fullProfile.selfCitations,
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.selfCitations]));
        series.push(new Series('indirect self-citations', [this._fullProfile.indirectSelfCitations]));

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

    //This method creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void {
        this._rowModels = new Array<RowModel>();
        this.rowModels.push(new RowModel(8));
        const pby: PieChartModel = this.createCitationsCard();
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
        return;
    }
    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        this.rowModels.push(new RowModel(10));
        const art: ArticlesModel = this.createArticlesCard();
        this.rowModels[1].simpleCardModels.push(art);
    }
}
