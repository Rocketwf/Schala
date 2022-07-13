import { Filterable } from '../../filters';
import { ArticlesModel } from '../articlesmodel';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';
import { Field } from './Inputs';

export interface PopupEditButton<S extends Filterable<S>> {
    /**
     * Represents the id value as a string
     */
    id: string;
    /**
     * Represents the label value as a string
     */
    label: string;
    /**
     * Represents the icon value as a string
     */
    icon: string;
    /**
     * Represents the inputs value as a Field Array
     */
    inputs: Field<number | string, S>[];
    /**
     * Method for handling all inputs
     */
    handleAll(): void;
}

export class RangeButton implements PopupEditButton<ObjectSeriesChartModel> 
{
    /**
     * Represents the id value as a string
     */
    private _id: string = '@' + Math.random().toString(31);
    /**
     * Represents the label value as a string
     */
    private _label: string;
    /**
     * Represents the inputs value as a Field Array
     */
    private _inputs: Field<number, ObjectSeriesChartModel>[];
    /**
     * Represents the icon value as a string
     */
    private _icon: string = 'event';
    /**
     * Creates an instance of range button.
     * @param _label - Represents the label value as a string
     * @param _inputs - Represents the inputs value as a Field Array
     */
    constructor(_label: string, _inputs: Field<number, ObjectSeriesChartModel>[]) 
    {
        this._label = _label;
        this._inputs = _inputs;
    }
    /**
     * Getter method of the icon attribute
     */
    public get icon(): string 
    {
        return this._icon;
    }
    /**
     * Method for hadnling all inputs
     */
    public handleAll(): void 
    {
        for (const input of this._inputs) 
        {
            input.handleInput();
        }
    }
    /**
     * Setter method of the label attribute
     */
    public set label(value: string) 
    {
        this._label = value;
    }
    /**
     * Getter method of the label attribute
     */
    public get label(): string 
    {
        return this._label;
    }
    /**
     * Getter method of the id attribute
     */
    public get id(): string 
    {
        return this._id;
    }
    /**
     * Setter method of the id attribute
     */
    public set id(id: string) 
    {
        this._id = id;
    }
    /**
     * Getter method of the inputs attribute
     */
    public get inputs(): Field<number, ObjectSeriesChartModel>[] 
    {
        return this._inputs;
    }
    /**
     * Setter method of the inputs attribute
     */
    public set inputs(v: Field<number, ObjectSeriesChartModel>[]) 
    {
        this._inputs = v;
    }
}

export class ShowingButton implements PopupEditButton<ObjectSeriesChartModel> 
{
    /**
     * Represents the id value as a string
     */
    private _id: string = '@' + Math.random().toString(31);
    /**
     * Represents the label value as a string
     */
    private _label: string;
    /**
     * Represents the cached label value as a string
     */
    private _cachedLabel: string;
    /**
     * Represents the inputs value as a Field Array
     */
    private _inputs: Field<number, ObjectSeriesChartModel>[];
    /**
     * Represents the icon value as a string
     */
    private _icon: string = 'people';
    /**
     * Creates an instance of showing button.
     * @param _label - Represents the label value as a string
     * @param _inputs - Represents the inputs value as a Field Array
     */
    constructor(_label: string, _inputs: Field<number, ObjectSeriesChartModel>[]) 
    {
        this._cachedLabel = _label;
        this._inputs = _inputs;
        this._label = _label + this._inputs[0].inputValue;
    }
    /**
     * Getter method of the icon attribute
     */
    public get icon(): string 
    {
        return this._icon;
    }
    /**
     * Setter method of the icon attribute
     */
    public set icon(v: string) 
    {
        this._icon = v;
    }
    /**
     * Method for handling all inputs
     */
    public handleAll(): void 
    {
        this._label = this._cachedLabel + ': ' + this._inputs[0].inputValue;
        this._inputs[0].handleInput();
    }
    /**
     * Setter method of the label attribute
     */
    public set label(value: string) 
    {
        this._label = value;
    }
    /**
     * Getter method of the label attribute
     */
    public get label(): string 
    {
        return this._label;
    }
    /**
     * Getter method of the id attribute
     */
    public get id(): string 
    {
        return this._id;
    }
    /**
     * Setter method of the id attribute
     */
    public set id(v: string) 
    {
        this._id = v;
    }
    /**
     * Getter method of the inputs attribute
     */
    public get inputs(): Field<number, ObjectSeriesChartModel>[] 
    {
        return this._inputs;
    }
    /**
     * Setter method of the inputs attribute
     */
    public set inputs(v: Field<number, ObjectSeriesChartModel>[]) 
    {
        this._inputs = v;
    }
}

export class ArticlesFilterButton implements PopupEditButton<ArticlesModel> 
{
    /**
     * Represents the id value as a string
     */
    private _id: string = '@' + Math.random().toString(31);
    /**
     * Represents the label value as a string
     */
    private _label: string;
    /**
     * Represents the inputs value as a Field Array
     */
    private _inputs: Field<string, ArticlesModel>[];
    /**
     * Represents the icon value as a string
     */
    private _icon: string = 'add';
    /**
     * Creates an instance of articles filter button.
     * @param _label - Represents the inputs value as a Field Array
     * @param _inputs - Represents the inputs value as a Field Array
     */
    constructor(_label: string, _inputs: Field<string, ArticlesModel>[]) 
    {
        this._label = _label;
        this._inputs = _inputs;
    }
    /**
     * Getter method of the icon attribute
     */
    public get icon(): string 
    {
        return this._icon;
    }
    /**
     * Setter method of the icon attribute
     */
    public set icon(v: string) 
    {
        this._icon = v;
    }
    /**
     * Method for handling all inputs
     */
    public handleAll(): void 
    {
        for (const input of this.inputs) 
        {
            input.handleInput();
        }
    }
    /**
     * Setter method of the label attribute
     */
    public set label(value: string) 
    {
        this._label = value;
    }
    /**
     * Getter method of the label attribute
     */
    public get label(): string 
    {
        return this._label;
    }
    /**
     * Getter method of the id attribute
     */
    public get id(): string 
    {
        return this._id;
    }
    /**
     * Setter method of the id attribute
     */
    public set id(v: string) 
    {
        this._id = v;
    }
    /**
     * Getter method of the inputs attribute
     */
    public get inputs(): Field<string, ArticlesModel>[] 
    {
        return this._inputs;
    }
    /**
     * Setter method of the inputs attribute
     */
    public set inputs(v: Field<string, ArticlesModel>[]) 
    {
        this._inputs = v;
    }
}
