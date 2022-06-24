import { Filter, Filterable } from '../../filters';

export interface Input<T, S extends Filterable<S>> {
    inputName: string;
    inputId: string;
    inputValue: T;

    handleInput(value: T, filter: Filter<T, S>, data: Filterable<S>[]): void;
}
