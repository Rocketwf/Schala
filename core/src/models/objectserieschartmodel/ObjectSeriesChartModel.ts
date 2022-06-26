import { Filterable } from '../../filters';

export class ObjectSeriesChartModel implements Filterable<ObjectSeriesChartModel> {
    private _series: Series[];

    public get series(): Series[] {
        return this._series;
    }

    deepCopy(): ObjectSeriesChartModel {
        throw new Error('Method not implemented.');
    }
    applyAllFilters(): void {
        throw new Error('Method not implemented.');
    }
}

export class Series {
    private _name: string;
    private _data: Array<number>;
    private _type: string;

    constructor(_name: string, _data: number[], _type?: string) {
        this._name = _name;
        this._data = _data;
        this._type = _type;
    }

    public get name(): string {
        return this._name;
    }
}
