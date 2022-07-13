import { Filter } from '../../filters';
import { Filterable } from '../../filters/Filterable';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';

export class ChartOptionsModel implements Filterable<ChartOptionsModel> 
{
    private _isExpanded: boolean;
    private _expandable: boolean;
    /**
     * Represents the max limit value as a number
     */
    private _maxLimit: number;
    /**
     * Represents the second max limit value as a number
     */
    private _maxLimitTwo: number;
    /**
     * Represents the objectSeriesChartModels attribute as a ObjectSeriesChartModel array
     */
    private _objectSeriesChartModels: Array<ObjectSeriesChartModel>;

    /**
     * Creates an instance of chart options model.
     * @param _objectSeriesChartModels - Represents the objectSeriesChartModels attribute as a ObjectSeriesChartModel array
     */
    constructor(_objectSeriesChartModels: ObjectSeriesChartModel[]) 
    {
        this._objectSeriesChartModels = _objectSeriesChartModels;
    }
    /**
     * Represents the filters as a Filter array
     */
    private _filters: Filter<boolean, ChartOptionsModel>[];

    /**
     * Getter method of the objectSeriesChartModels attribute
     */
    public get objectSeriesChartModels(): ObjectSeriesChartModel[] 
    {
        return this._objectSeriesChartModels;
    }
    /**
     * Setter method of the objectSeriesChartModels attribute
     */
    public set objectSeriesChartModels(objectSeriesChartModels: ObjectSeriesChartModel[]) 
    {
        this._objectSeriesChartModels = objectSeriesChartModels;
    }
    /**
     * Getter method of the maxLimit attribute
     */
    public get maxLimit(): number 
    {
        return this._maxLimit;
    }
    /**
     * Setter method of the maxLimit attribute
     */
    public set maxLimit(newLimit: number) 
    {
        this._maxLimit = newLimit;
    }
    /**
     * Getter method of the second maxLimit attribute
     */
    public get maxLimitTwo(): number 
    {
        return this._maxLimitTwo;
    }
    /**
     * Setter method of the second maxLimit attribute
     */
    public set maxLimitTwo(newLimit: number) 
    {
        this._maxLimitTwo = newLimit;
    }

    /**
     * Creates a copy of the model
     * @returns copy of the model as a ChartOptionsModel
     */
    deepCopy(): ChartOptionsModel 
    {
        const comCpy: ChartOptionsModel = new ChartOptionsModel(this._objectSeriesChartModels);
        comCpy._filters = this._filters;
        comCpy._maxLimit = this._maxLimit;
        comCpy._maxLimitTwo = this._maxLimitTwo;
        return comCpy;
    }
    /**
     * Applies all filters on the model
     */
    applyAllFilters(): void 
    {
        // persist if needed
        for (const filter of this._filters) 
        {
            filter.applyValidate(this);
        }
    }
    /**
     * Getter method of the filters attribute
     */
    public get filters(): Filter<boolean, ChartOptionsModel>[] 
    {
        return this._filters;
    }
    /**
     * Setter method of the filters attribute
     */
    public set filters(filters: Filter<boolean, ChartOptionsModel>[]) 
    {
        this._filters = filters;
    }
    /**
     * Getter method of the entries attribute
     */
    public get entries(): number 
    {
        return this._objectSeriesChartModels.length;
    }
    saveFilters(): void 
    {
        return;
    }
    restoreFilters(): void 
    {
        return;
    }
    public get isExpanded(): boolean 
    {
        return this._isExpanded;
    }
    public set isExpanded(v: boolean) 
    {
        this._isExpanded = v;
    }

    public get expandable(): boolean 
    {
        return this._expandable;
    }
    public set expandable(v: boolean) 
    {
        this._expandable = v;
    }
}
