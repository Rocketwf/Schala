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
    validate(model: T): boolean {
        model;
        return true;
    }

    applyValidate(model: T): void {
        console.log(this.validate(model));
        if (this.validate(model)) this.apply(model);
    }

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
