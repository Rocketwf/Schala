import { Filterable } from '../../filters';
import { ArticlesModel } from '../articlesmodel';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';
import { Field } from './Inputs';

export interface PopupEditButton<S extends Filterable<S>> {
    id: string;
    label: string;
    icon: string;
    inputs: Field<number | string, S>[];
    handleAll(): void;
}

export class RangeButton implements PopupEditButton<ObjectSeriesChartModel> {
    private _id: string = '@' + Math.random().toString(31);
    private _label: string;
    private _inputs: Field<number, ObjectSeriesChartModel>[];
    private _icon: string = 'event';
    constructor(_label: string, _inputs: Field<number, ObjectSeriesChartModel>[]) {
        this._label = _label;
        this._inputs = _inputs;
    }

    public get icon(): string {
        return this._icon;
    }

    public handleAll(): void {
        for (const input of this._inputs) {
            input.handleInput();
        }
    }
    public set label(value: string) {
        this._label = value;
    }

    public get label(): string {
        return this._label;
    }

    public get id(): string {
        return this._id;
    }

    public set id(v: string) {
        this._id = v;
    }

    public get inputs(): Field<number, ObjectSeriesChartModel>[] {
        return this._inputs;
    }

    public set inputs(v: Field<number, ObjectSeriesChartModel>[]) {
        this._inputs = v;
    }
}

export class ShowingButton implements PopupEditButton<ObjectSeriesChartModel> {
    private _id: string = '@' + Math.random().toString(31);
    private _label: string;
    private _cachedLabel: string;
    private _inputs: Field<number, ObjectSeriesChartModel>[];
    private _icon: string = 'people';
    constructor(_label: string, _inputs: Field<number, ObjectSeriesChartModel>[]) {
        this._cachedLabel = _label;
        this._inputs = _inputs;
        this._label = _label + this._inputs[0].inputValue;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(v: string) {
        this._icon = v;
    }

    public handleAll(): void {
        this._label = this._cachedLabel + ': ' + this._inputs[0].inputValue;
        this._inputs[0].handleInput();
    }
    public set label(value: string) {
        this._label = value;
    }

    public get label(): string {
        return this._label;
    }

    public get id(): string {
        return this._id;
    }

    public set id(v: string) {
        this._id = v;
    }

    public get inputs(): Field<number, ObjectSeriesChartModel>[] {
        return this._inputs;
    }

    public set inputs(v: Field<number, ObjectSeriesChartModel>[]) {
        this._inputs = v;
    }
}

export class ArticlesFilterButton implements PopupEditButton<ArticlesModel> {
    private _id: string = '@' + Math.random().toString(31);
    private _label: string;
    private _inputs: Field<string, ArticlesModel>[];
    private _icon: string = 'add';
    constructor(_label: string, _inputs: Field<string, ArticlesModel>[]) {
        this._label = _label;
        this._inputs = _inputs;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(v: string) {
        this._icon = v;
    }

    public handleAll(): void {
        for (const input of this.inputs) {
            input.handleInput();
        }
    }
    public set label(value: string) {
        this._label = value;
    }

    public get label(): string {
        return this._label;
    }

    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    public get inputs(): Field<string, ArticlesModel>[] {
        return this._inputs;
    }
    public set inputs(v: Field<string, ArticlesModel>[]) {
        this._inputs = v;
    }
}
