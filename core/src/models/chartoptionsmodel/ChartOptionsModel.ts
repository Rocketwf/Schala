import { Filterable } from '../../filters/Filterable';
import { Series } from '../objectserieschartmodel';

export class ChartOptionsModel implements Filterable<ChartOptionsModel> {
    private _maxLimit: number;
    private _series: Series[];

    constructor(_series: Series[]) {
        this._series = _series;
    }

    public get series(): Series[] {
        return this._series;
    }

    public set series(newSeries: Series[]) {
        this._series = newSeries;
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
