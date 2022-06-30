import { Series, StackedColumns100ChartModel, ViewName } from '../models';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';

export class ComparisonRepresentation {
    private _fullProfiles: FullProfile[];
    private _rowModels: RowModel[];

    constructor(_fullProfiles: FullProfile[]) {
        this._fullProfiles = _fullProfiles;
        this._rowModels = new Array<RowModel>();
    }

    renderComparison(): void {
        this._rowModels = new Array<RowModel>();
        const cerRow: RowModel = this.createCitationsExpertiseRow();

        this.pushRow(cerRow);
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
    public get fullProfiles(): FullProfile[] {
        return this._fullProfiles;
    }
    public set fullProfiles(fullProfile: FullProfile[]) {
        this._fullProfiles = fullProfile;
    }
    private createPublicationByVenueYearRow(): RowModel {
        return null;
    }
    private createCitationsByYearRow(): RowModel {
        return null;
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
        const cerRow: RowModel = new RowModel(12);
        const series: Array<Series> = new Array<Series>();

        const citationData: number[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            citationData.push(profile.basicProfile.totalCitations - profile.selfCitations);
        });
        series.push(new Series('citations by others', citationData));

        const selfCitationData: number[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            selfCitationData.push(profile.selfCitations);
        });
        series.push(new Series('self-citations', selfCitationData));

        const indirectSelfCitationData: number[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            indirectSelfCitationData.push(profile.indirectSelfCitations);
        });
        series.push(new Series('indirect self-citations', indirectSelfCitationData));

        const labels: string[] = [];
        this.fullProfiles.forEach((profile: FullProfile) => {
            labels.push(profile.basicProfile.name);
        });
        const stackedColumns100ChartModel: StackedColumns100ChartModel = new StackedColumns100ChartModel(
            'Citations',
            '',
            ViewName.StackedColumns100Chart,
            6,
            series,
            'Scholar Names',
            '',
            labels,
        );
        cerRow.simpleCardModels.push(stackedColumns100ChartModel);

        return cerRow;
    }
}
