import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { PieChartModel } from '../models';
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
        this._rowModels.push(new RowModel(8));
        const pby: PieChartModel = this.createCitationsCard();

        this._rowModels[0].simpleCardModels.push(pby);
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
                this._fullProfile.basicProfile.totalCitations - this._fullProfile.selfCitations,
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.selfCitations]));
        series.push(new Series('indirect self-citations', [this._fullProfile.indirectSelfCitations]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
    }
}
