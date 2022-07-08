import { Filterable } from '../../filters';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';
import { Field } from './Inputs';

export interface PopupEditButton<S extends Filterable<S>> {
    id: string;
    label: string;
    inputs: Field<number, S>[];
    setLabel(value: string): void;
    handleAll(data: S[]): void;
}

export class RangeButton implements PopupEditButton<ObjectSeriesChartModel> {
    private _id: string = '@' + Math.random().toString(31);
    private _label: string;
    private _inputs: Field<number, ObjectSeriesChartModel>[];
    constructor(_label: string, _inputs: Field<number, ObjectSeriesChartModel>[]) {
        this._label = _label;
        this._inputs = _inputs;
    }
    public handleAll(data: ObjectSeriesChartModel[]): void {
        for (const input of this.inputs) {
            input.handleInput(data);
        }
    }
    setLabel(value: string): void {
        this._label = value;
    }

    public get label(): string {
        return this._label;
    }

    public get id(): string {
        return this._id;
    }

    public get inputs(): Field<number, ObjectSeriesChartModel>[] {
        return this._inputs;
    }
}
