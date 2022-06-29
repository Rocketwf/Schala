import { Filterable } from './Filterable';

export abstract class Filter<S, T extends Filterable<T>> {
    protected _value: S;

    constructor(value: S) {
        this._value = value;
    }

    abstract apply(model: T): void;
    public set value(newValue: S) {
        this._value = newValue;
    }

    public get value(): S {
        return this._value;
    }
}
