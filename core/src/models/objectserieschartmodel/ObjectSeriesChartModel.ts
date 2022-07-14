import { Filter, Filterable } from '../../filters';
import { Expandable } from '../../filters/Filterable';
import { Message, STATUS } from '../../misc/Message';
import { ChartOptionsModel } from '../chartoptionsmodel';
import { PopupEditButton } from '../inputs';
import { SimpleCardModel, ViewName } from '../simplecardmodel/SimpleCardModel';

export abstract class ObjectSeriesChartModel
implements Filterable<ObjectSeriesChartModel>, Expandable<ObjectSeriesChartModel>, SimpleCardModel
{
    /**
     * Represents the id as a string.
     */
    private _id: string;

    /**
     * Represents the column width as a number.
     */
    private _colWidth: number;

    /**
     * Represents the title as a string.
     */
    private _title: string;

    /**
     * Represents the subtitle as a string.
     */
    private _sub: string;

    /**
     * Represents the view name as a ViewName.
     */
    private _viewName: ViewName;

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
     * Represents the data to be represented as a list of Series.
     */
    private _series: Series[];

    /**
     * Represents the cached model as a ObjectSeriesChartModel.
     */
    private _cachedModel: ObjectSeriesChartModel;

    /**
     * Contains the popup buttons to be added to the model
     */
    private _popupButtons: PopupEditButton<number, ObjectSeriesChartModel>[];

    private _savedButtons: PopupEditButton<number, ObjectSeriesChartModel>[];
    /**
     * Contains the filters to be applied to the model
     */
    private _filters: Filter<number, ObjectSeriesChartModel>[];

    /**
     * Represents the chart options model as a ChartOptionsModel.
     */
    private _chartOptionsModel: ChartOptionsModel;

    private _isExpanded: boolean;
    private _isShowingExpandButton: boolean;
    /**
     * Creates an instance of BasicBarsChartModel.
     * @param _title - Represents the title value as a string
     * @param _sub - Represents the subtitle value as a string
     * @param _viewName - Represents the view name value as a ViewName
     * @param _colWidth - Represents the column width value as a number
     * @param _series - Represents the series value as a series array
     * @param _xTitle - Represents the x-axis title value as a string
     * @param _yTitle - Represents the y-axis title value as a string
     * @param _labels - Represents the labels value as a string array
     * @param _popupButtons - Represents the popup buttons as a PopupEditButton list
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
        _popupButtons?: PopupEditButton<number, ObjectSeriesChartModel>[],
    ) 
    {
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
        this._series = _series;
        this._xTitle = _xTitle;
        this._yTitle = _yTitle;
        this._labels = _labels;

        this._popupButtons = _popupButtons;
        this._isShowingExpandButton = false;
        this._isExpanded = false;
    }

    /**
     * Creates a carbon copy of the model.
     * @returns the created copy as ObjectSeriesChartModel
     */
    abstract deepCopy(): ObjectSeriesChartModel;

    /**
     * If the cachedModel is null, call persist method
     */
    private persistOnce(): void 
    {
        if (!this._cachedModel) 
        {
            this.persist();
        }
    }

    /**
     * Applies all the filters with the current value on the cached data.
     */
    public applyAllFilters(): Message[] 
    {
        this.persistOnce();

        const persistForFailure: ObjectSeriesChartModel = this.deepCopy();

        this.series = this._cachedModel.series;


        const msgs: Message[] = new Array<Message>();
        for (const filter of this._filters) 
        {
            const msg: Message = filter.applyValidate(this);
            msgs.push(msg);
            if (msg.status === STATUS.FAIL) 
            {
                this.series = persistForFailure.series;
                break;
            }
        }
        return msgs;
    }

    /**
     * Setter method of the chartOptionsModel.
     */
    public set chartOptionsModel(chartOptionModel: ChartOptionsModel) 
    {
        this._chartOptionsModel = chartOptionModel;
    }

    /**
     * Getter method of the chartOptionsModel.
     */
    public get chartOptionsModel(): ChartOptionsModel 
    {
        return this._chartOptionsModel;
    }

    /**
     * Getter method of the data that is currently being represented.
     */
    public get series(): Series[] 
    {
        return this._series;
    }

    /**
     * Setter method of the data to be represented.
     */
    public set series(newSeries: Series[]) 
    {
        this._series = newSeries;
    }

    /**
     * Getter method of the popup buttons to be added.
     */
    public get popupButtons(): PopupEditButton<number, ObjectSeriesChartModel>[] 
    {
        return this._popupButtons;
    }

    /**
     * Setter method of the filters to be applied.
     */
    public set popupButtons(popupButtons: PopupEditButton<number, ObjectSeriesChartModel>[]) 
    {
        this._popupButtons = popupButtons;
    }

    /**
     * Getter method of the colWidth attribute.
     */
    public get colWidth(): number 
    {
        return this._colWidth;
    }

    /**
     * Setter method of the colWidth attribute.
     */
    public set colWidth(v: number) 
    {
        this._colWidth = v;
    }

    /**
     * Getter method of the title attribute.
     */
    public get title(): string 
    {
        return this._title;
    }

    /**
     * Setter method of the title attribute.
     */
    public set title(v: string) 
    {
        this._title = v;
    }

    /**
     * Getter method of the id attribute.
     */
    public get id(): string 
    {
        return this._id;
    }

    /**
     * Setter method of the id attribute.
     */
    public set id(v: string) 
    {
        this._id = v;
    }

    /**
     * Getter method of the sub attribute.
     */
    public get sub(): string 
    {
        return this._sub;
    }

    /**
     * Setter method of the sub attribute.
     */
    public set sub(v: string) 
    {
        this._sub = v;
    }

    /**
     * Getter method of the viewName attribute.
     */
    public get viewName(): ViewName 
    {
        return this._viewName;
    }

    /**
     * Setter method of the viewName attribute.
     */
    public set viewName(v: ViewName) 
    {
        this._viewName = v;
    }

    /**
     * Getter method of the xTitle attribute.
     */
    public get xTitle(): string 
    {
        return this._xTitle;
    }

    /**
     * Setter method of the xTitle attribute.
     */
    public set xTitle(v: string) 
    {
        this._xTitle = v;
    }

    /**
     * Getter method of the yTitle attribute.
     */
    public get yTitle(): string 
    {
        return this._yTitle;
    }

    /**
     * Setter method of the yTitle attribute.
     */
    public set yTitle(v: string) 
    {
        this._yTitle = v;
    }

    /**
     * Getter method of the labels attribute.
     */
    public get labels(): string[] 
    {
        return this._labels;
    }

    /**
     * Setter method of the labels attribute.
     */
    public set labels(v: string[]) 
    {
        this._labels = v;
    }

    /**
     * Save copy of model to the cachedModel
     */
    public persist(): void 
    {
        this._cachedModel = this.deepCopy();
    }

    /**
     * Getter method of the filters attribute.
     */
    public get filters(): Filter<number, ObjectSeriesChartModel>[] 
    {
        return this._filters;
    }

    /**
     * Setter method of the filters attribute.
     */
    public set filters(filters: Filter<number, ObjectSeriesChartModel>[]) 
    {
        this._filters = filters;
    }

    /**
     * Getter method of the entries attribute.
     */
    public get entries(): number 
    {
        return this._series.length;
    }

    saveFilters(): void 
    {
        this._savedButtons = [];
        for (const btn of this._popupButtons) 
        {
            this._savedButtons.push(btn.deepCopy());
        }
    }
    restoreFilters(): void 
    {
        this._popupButtons = this._savedButtons;
        this._filters = [];
        for (const btn of this._popupButtons) 
        {
            for (const input of btn.inputs) 
            {
                this._filters.push(input.filter);
            }
        }
        this.applyAllFilters();
    }
    public get isExpanded(): boolean 
    {
        return this._isExpanded;
    }
    public set isExpanded(v: boolean) 
    {
        this._isExpanded = v;
    }
    public toggleExpand(): void 
    {
        this._isExpanded = !this._isExpanded;
    }

    public get isShowingExpandButton(): boolean 
    {
        return this._isShowingExpandButton;
    }
    public set isShowingExpandButton(v: boolean) 
    {
        this._isShowingExpandButton = v;
    }
    public showExpandButton(): void 
    {
        this._isShowingExpandButton = true;
    }
    public hideExpandButton(): void 
    {
        this._isShowingExpandButton = false;
    }
}

export class Series 
{
    /**
     * Represents the name of the series as a string.
     */
    private _name: string;

    /**
     * Represents the data of the series as a number list.
     */
    private _data: Array<number>;

    /**
     * Represents the type of the series as a string.
     */
    private _type: string;

    /**
     * Constructs the data to be respresented.
     * @param _name - name of the series as a string.
     * @param _data - data of the series as a number list.
     * @param _type - type of the series as a string.
     */
    constructor(_name: string, _data: number[], _type?: string) 
    {
        this._name = _name;
        this._data = _data;
        this._type = _type;
    }

    /**
     * Getter method of the name attribute.
     */
    public get name(): string 
    {
        return this._name;
    }

    /**
     * Setter method of the name attribute.
     */
    public set name(v: string) 
    {
        this._name = v;
    }

    /**
     * Getter method of the data attribute.
     */
    public get data(): Array<number> 
    {
        return this._data;
    }

    /**
     * Setter method of the data attribute.
     */
    public set data(v: number[]) 
    {
        this._data = v;
    }

    /**
     * Getter method of the type attribute.
     */
    public get type(): string 
    {
        return this._type;
    }

    /**
     * Setter method of the type attribute.
     */
    public set type(v: string) 
    {
        this._type = v;
    }
}
