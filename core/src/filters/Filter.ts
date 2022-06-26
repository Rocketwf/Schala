import { Filterable } from './Filterable';

export abstract class Filter<S, T extends Filterable<T>> {
    private _value: S;

    abstract apply(model: T): void;

    public get value(): S {
        return this._value;
    }

    public set value(value: S) {
        this._value = value;
    }
}
