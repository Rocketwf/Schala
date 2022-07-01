import { Filter, Filterable } from '../../filters';
import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ObjectSeriesChartModel implements Filterable<ObjectSeriesChartModel>, SimpleCardModel {
    private _series: Series[];
    private _id: string;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;
    private _xTitle: string;
    private _yTitle: string;
    private _labels: string[];
    constructor(
        _title: string,
        _sub: string,
        _viewName: ViewName,
        _colWidth: number,
        _series: Array<Series>,
        _xTitle: string,
        _yTitle: string,
        _labels: string[],
    ) {
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this._series = _series;
        this._xTitle = _xTitle;
        this._yTitle = _yTitle;
        this._labels = _labels;
    }

    public get series(): Series[] {
        return this._series;
    }

    public set series(newSeries: Series[]) {
        this._series = newSeries;
    }

    public get id(): string {
        return this._id;
    }
    public get colWidth(): number {
        return this._colWidth;
    }
    public get title(): string {
        return this._title;
    }
    public get sub(): string {
        return this._sub;
    }
    public get viewName(): ViewName {
        return this._viewName;
    }

    public get xTitle(): string {
        return this._xTitle;
    }
    public get yTitle(): string {
        return this._yTitle;
    }
    public get labels(): string[] {
        return this._labels;
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
