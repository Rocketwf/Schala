import { Filter } from './Filter';

export interface Filterable<T extends Filterable<T>> {
    deepCopy(): T;
    applyAllFilters(): void;

    filters?: Filter<number | string | string[] | boolean, T>[];
    entries: number;
}

export interface Paginable<T extends Filterable<T>> extends Filterable<T> {
    deepCopy(): T;
    applyAllFilters(): void;
    applyPaginationFilter(): void;

    filters?: Filter<number | string | string[] | boolean, T>[];
    paginationFilter?: Filter<number, T>;
    entries: number;
}
