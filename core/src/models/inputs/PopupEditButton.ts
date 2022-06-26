import { Filterable } from '../../filters';

export interface PopupEditButton<T, S extends Filterable<S>> {
    label: string;
    setLabel(value: T, data: Array<Filterable<S>>): void;
}
