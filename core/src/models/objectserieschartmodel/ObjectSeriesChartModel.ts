import { Filter, Filterable } from '../../filters';
import { ViewName } from '../simplecardmodel/SimpleCardModel';

export class ObjectSeriesChartModel implements Filterable<ObjectSeriesChartModel> {
    filters: Filter<object, ObjectSeriesChartModel>[];
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;
    private _colWidth: number;
    private _series: Array<Series>;

    constructor(_title: string, _sub: string, _viewName: ViewName, _colWidth: number, _series: Array<Series>) {
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this._series = _series;
    }

    public get series(): Series[] {
        return this._series;
    }

    public set series(newSeries: Series[]) {
        this._series = newSeries;
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
    public get data(): Array<number> {
        return this._data;
    }
}
