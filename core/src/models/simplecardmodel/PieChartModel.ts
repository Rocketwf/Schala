import { SimpleCardModel, ViewName } from './SimpleCardModel';
import { Series } from '../objectserieschartmodel/ObjectSeriesChartModel';

export class PieChartModel implements SimpleCardModel 
{
    private _id: string = '_' + Math.random().toString(36);
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;
    private _series: Array<Series>;

    constructor(_title: string, _sub: string, _viewName: ViewName, _colWidth: number, _series: Array<Series>) 
    {
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this._series = _series;
    }

    public get colWidth(): number 
    {
        return this._colWidth;
    }

    public set colWidth(v: number) 
    {
        this._colWidth = v;
    }

    public get title(): string 
    {
        return this._title;
    }

    public set title(v: string) 
    {
        this._title = v;
    }

    public get id(): string 
    {
        return this._id;
    }

    public set id(v: string) 
    {
        this._id = v;
    }

    public get sub(): string 
    {
        return this._sub;
    }

    public set sub(v: string) 
    {
        this._sub = v;
    }

    public get viewName(): ViewName 
    {
        return this._viewName;
    }

    public set viewName(v: ViewName) 
    {
        this._viewName = v;
    }

    public get series(): Array<Series> 
    {
        return this._series;
    }

    public set series(v: Array<Series>) 
    {
        this._series = v;
    }
}
