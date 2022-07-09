import { Filter } from '../../filters';

import { Filterable } from '../../filters/Filterable';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';

export class ChartOptionsModel implements Filterable<ChartOptionsModel> {
    private _maxLimit: number;
    private _objectSeriesChartModels: Array<ObjectSeriesChartModel>;

    constructor(_objectSeriesChartModels: ObjectSeriesChartModel[]) {
        this._objectSeriesChartModels = _objectSeriesChartModels;
    }
    private _filters: Filter<boolean, ChartOptionsModel>[];

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
        for (const filter of this._filters) {
            filter.applyValidate(this);
        }
    }

    public get filters(): Filter<boolean, ChartOptionsModel>[] {
        return this._filters;
    }
    public set filters(filters: Filter<boolean, ChartOptionsModel>[]) {
        this._filters = filters;
    }
}
