import { Filterable } from './Filterable';

export abstract class Filter<S, T extends Filterable<T>> {
    protected _value: S;

    constructor(value: S) {
        this._value = value;
    }

    /**
     * Abstract method for applying a filter to the passed Model.
     */

    abstract apply(model: T): void;

    /**
     * Setter method of the value attribute.
     */
    public set value(newValue: S) {
        this._value = newValue;
    }

    /**
     * Getter method of the value attribute.
     */
    public get value(): S {
        return this._value;
    }
}
