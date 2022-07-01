import { FullProfile, Citations } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { ArticlesModel, PieChartModel, ObjectSeriesChartModel, StackedColumnsChartModel } from '../models';
import { ViewName } from '../models/simplecardmodel/SimpleCardModel';
import { Series } from '../models/objectserieschartmodel/ObjectSeriesChartModel';

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this._rowModels = new Array<RowModel>();
        this.rowModels.push(new RowModel(8));
        const pby: PieChartModel = this.createCitationsCard();
        const cby: ObjectSeriesChartModel = this.createCitationByYearCard();

        this.rowModels[0].simpleCardModels.push(cby);
        this.rowModels[0].simpleCardModels.push(pby);

        this.rowModels.push(new RowModel(10));
        const art: ArticlesModel = this.createArticlesCard();
        this.rowModels[1].simpleCardModels.push(art);
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
