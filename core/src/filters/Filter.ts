import { Filterable } from './Filterable';

export abstract class Filter<S, T extends Filterable<T>> {
    private _value: S;

    public set value(newValue: S) {
        this._value = newValue;
    }

    public get value(): S {
        return this._value;
    }
}
