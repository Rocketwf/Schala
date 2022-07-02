import { Filterable } from '../../filters/Filterable';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';

export class ChartOptionsModel implements Filterable<ChartOptionsModel> {
    private _maxLimit: number = 0;
    private _objectSeriesChartModels: Array<ObjectSeriesChartModel>;

    constructor(_objectSeriesChartModels: ObjectSeriesChartModel[]) {
        this._objectSeriesChartModels = _objectSeriesChartModels;
    }

    public get objectSeriesChartModels(): ObjectSeriesChartModel[] {
        return this._objectSeriesChartModels;
    }

    public set objectSeriesChartModels(objectSeriesChartModels: ObjectSeriesChartModel[]) {
        this._objectSeriesChartModels = objectSeriesChartModels;
    }

    public get maxLimit(): number {
        return this._maxLimit;
    }

    public set maxLimit(newLimit: number) {
        this._maxLimit = newLimit;
    }

    deepCopy(): ChartOptionsModel {
        throw new Error('Method not implemented.');
    }
    applyAllFilters(): void {
        //filter.apply(this);
    }
}
