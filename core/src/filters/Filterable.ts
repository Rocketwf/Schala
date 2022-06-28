import { Filter } from './Filter';

export interface Filterable<T extends Filterable<T>> {
    filters: Array<Filter<object, T>>;
    deepCopy(): T;
    applyAllFilters(): void;
}
