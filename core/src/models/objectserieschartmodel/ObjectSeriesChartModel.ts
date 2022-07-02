import { Filter, Filterable } from '../../filters';
import { ViewName } from '../simplecardmodel/SimpleCardModel';

export abstract class ObjectSeriesChartModel implements Filterable<ObjectSeriesChartModel> {
    private _id: string;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    private _cachedModel: ObjectSeriesChartModel;

    /**
     * Contains the filters to be applied to the model
     */
    private _filters: Filter<number, ObjectSeriesChartModel>[];

    /**
     * Contains the data of the model.
     */
    private _series: Series[];

    /**
     * Represents the name of the x-axis as a string.
     */
    private _xTitle: string;

    /**
     * Represents the name of the y-axis as a string.
     */
    private _yTitle: string;

    /**
     * Represents the labels as a list of string.
     */
    private _labels: string[];

    /**
     * Constructs the ObjectSeriesChartModel
     * @param _title - title of the model
     * @param _sub - subtitle of the model
     * @param _viewName - type of the model
     * @param _colWidth - width of the model
     * @param _series - data of the model
     * @param _xTitle - name of the x-axis
     * @param _yTitle - name of the y-axis
     * @param _labels - labels of the model
     */
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
        this._series = this._series.splice(0, 10);
    }

    persist(): void {
        this._cachedModel = this.deepCopy();
    }
    /**
     * Creates a carbon copy of the model
     */
    abstract deepCopy(): ObjectSeriesChartModel;

    /**
     * Applies all the filters with the current value on the cached data.
     */
    abstract applyAllFilters(): void;

    /**
     * Getter method of the data that is currently being represented.
     */
    public get series(): Series[] {
        return this._series;
    }

    /**
     * Setter method of the data to be represented.
     */
    public set series(newSeries: Series[]) {
        this._series = newSeries;
    }

    /**
     * Getter method of the filters to be applied.
     */
    public get filters(): Filter<number, ObjectSeriesChartModel>[] {
        return this._filters;
    }

    /**
     * Setter method of the filters to be applied.
     */
    public set filters(newFilters: Filter<number, ObjectSeriesChartModel>[]) {
        this._filters = newFilters;
    }

    /**
     * Getter method of the colWidth attribute.
     */
    public get colWidth(): number {
        return this._colWidth;
    }

    /**
     * Getter method of the title attribute.
     */
    public get title(): string {
        return this._title;
    }

    /**
     * Getter method of the id attribute.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter method of the sub attribute.
     */
    public get sub(): string {
        return this._sub;
    }

    /**
     * Getter method of the viewName attribute.
     */
    public get viewName(): ViewName {
        return this._viewName;
    }

    /**
     * Getter method of the xTitle attribute.
     */
    public get xTitle(): string {
        return this._xTitle;
    }

    /**
     * Getter method of the yTitle attribute.
     */
    public get yTitle(): string {
        return this._yTitle;
    }

    /**
     * Getter method of the labels attribute.
     */
    public get labels(): string[] {
        return this._labels;
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
