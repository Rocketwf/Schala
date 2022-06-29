import { SimpleCardModel, ViewName } from './SimpleCardModel';
import { Series } from '../objectserieschartmodel/ObjectSeriesChartModel';

export class PieChartModel implements SimpleCardModel {
    private _id: string = '_' + Math.random().toString(36);
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;
    private _series: Array<Series>;

    constructor(_title: string, _sub: string, _viewName: ViewName, _colWidth: number, _series: Array<Series>) {
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this._series = _series;
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
    public get series(): Array<Series> {
        return this._series;
    }
}
