import { Filter } from './Filter';

export interface Filterable<T extends Filterable<T>> {
    deepCopy(): T;
    applyAllFilters(): void;

    filters?: Filter<number | string | string[] | boolean, T>[];
}
