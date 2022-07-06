import { ArticlesModel } from './../models/articlesmodel/ArticlesModel';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { LineColumnsMixedChartModel, ObjectSeriesChartModel, PieChartModel, Series, ViewName } from '../models';
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
        this._fullProfile.publicationsByYear;
        return null;
    }

    private createPublicationsByVenueCard(): ObjectSeriesChartModel {
        this._fullProfile.publicationsByVenue;
        return null;
    }

    private createMostCitedScholarsCard(): ObjectSeriesChartModel {
        this._fullProfile.citedScholars;
        return null;
    }

    private createMostFrequentCoAuthorsCard(): ObjectSeriesChartModel {
        this._fullProfile;
        return null;
    }

    private createCitationsByYearCard(): PieChartModel {
        return null;
    }

    private createExpertiseCard(): ExpertiseModel {
        const expertiseAuthor: string = this._fullProfile.basicProfile.name;
        const expertiseItems: string[] = this._fullProfile.expertise;
        type Expertise = {
            authorName: string;
            items: string[];
        };
        const expertiseObject: Expertise = { authorName: expertiseAuthor, items: expertiseItems };
        const expertiseModel: ExpertiseModel = new ExpertiseModel(
            [expertiseObject],
            'Expertise',
            '',
            ViewName.ExpertisesCard,
            5,
        );
        return expertiseModel;
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
                // this._fullProfile.basicProfile.totalCitations -
                //     this._fullProfile.citationsByYear-
                //     this._fullProfile.getIndirectSelfCitationsCount(),
            ]),
        );
        // series.push(new Series('self-citations', [this._fullProfile.getSelfCitationsCount()]));
        // series.push(new Series('indirect self-citations', [this._fullProfile.getIndirectSelfCitationsCount()]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
    }

    private createCoAuthorsWithHighestHIndexCard(): LineColumnsMixedChartModel {
        this.fullProfile.hIndex;
        const series: Array<Series> = new Array<Series>();
        const coAuthorIds: Set<string> = new Set();
        
        // for (const article of this._fullProfile.articles) {
        //     for (const coAuthor of article.coAuthors) {
        //         coAuthorIds.add(coAuthor);
        //     }
        // }

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
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createPublicationsByYearCard());
        rowModel.simpleCardModels.push(this.createPublicationsByVenueCard());
        rowModel.simpleCardModels.push(this.createCitationsByYearCard());
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
}
