import { Filterable } from './Filterable';

export abstract class Filter<S, T extends Filterable<T>> {
    /**
     * The value  of a filter
     */
    protected _value: S;

    /**
     * Creates an instance of filter.
     * @param value - value of the filter
     */
    constructor(value: S) {
        this._value = value;
    }

    /**
     * Abstract method for applying a filter to the passed Model.
     */
    abstract apply(model: T): void;

    /**
     * Validates filter
     * @param model - the given model
     * @returns true if the given model is valid
     */
    validate(model: T): boolean {
        model;
        return true;
    }

    /**
     * If the model is valid it calls apply method on the moodel
     * @param model - the given model
     */
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
