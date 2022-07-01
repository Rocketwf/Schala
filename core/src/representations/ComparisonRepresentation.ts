import {
    FullProfile,
    RowModel,
    ViewName,
    ObjectSeriesChartModel,
    Series,
    Citations,
    StackedColumnsChartModel,
} from '../models';

export class ComparisonRepresentation {
    private _fullProfiles: FullProfile[];
    private _rowModels: RowModel[];
    constructor(_fullProfiles: FullProfile[]) {
        this._fullProfiles = _fullProfiles;
        this._rowModels = new Array<RowModel>();
    }
    renderComparison(): void {
        this._rowModels = [];
        this.createCitationsByYearRow();
    }

    public get fullProfiles(): FullProfile[] {
        return this._fullProfiles;
    }
    public set fullProfiles(_fullProfiles: FullProfile[]) {
        this._fullProfiles = _fullProfiles;
    }

    public get rowModels(): RowModel[] {
        return this._rowModels;
    }
    //TODO: Implement these (I didnt because it was getting too late ZZZZzzzzz)
    public set rowModels(rowModels: RowModel[]) {
        this._rowModels = rowModels;
    }
    public pushRow(rowModel: RowModel): void {
        this._rowModels.push(rowModel);
    }
    private createPublicationByVenueYearRow(): RowModel {
        return null;
    }
    private createCitationsByYearRow(): void {
        const rowModel: RowModel = new RowModel(12);
        for (const fullProfile of this._fullProfiles) {
            const series: Series[] = new Array<Series>();
            fullProfile.citations.forEach((citations: Citations, year: number) => {
                series.push(
                    new Series(year + '', [
                        citations.indirectSelfCitationsCount,
                        citations.selfCitationsCount,
                        citations.totalCitationsCount -
                            citations.selfCitationsCount -
                            citations.indirectSelfCitationsCount,
                    ]),
                );
            });
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
    private createCitationsExpertiseRow(): RowModel {
        return null;
    }
}
