import { Filter } from './Filter';

export interface Filterable<T extends Filterable<T>> {
    /**
     * It creates a copy of this Filterable object
     * @returns copy of Filterable object
     */
    deepCopy(): T;
    /**
     * It applies all filters on Filterable object
     */
    applyAllFilters(): void;

    /**
     * It represents Filter array of a Filterable object
     */
    filters?: Filter<number | string | string[] | boolean, T>[];
    /**
     * It represents number of entries of a Filterable object
     */
    entries: number;
}

export interface Paginable<T extends Filterable<T>> extends Filterable<T> {
    /**
     * It creates a copy of this Paginable object
     * @returns copy of Paginable object
     */
    deepCopy(): T;
    /**s
     * It applies all filters on Paginable object
     */
    applyAllFilters(): void;
    /**
     * It applies all pagination filters on Paginable object
     */
    applyPaginationFilter(): void;

    /**
     * It represents Filter array of a Paginable object
     */
    filters?: Filter<number | string | string[] | boolean, T>[];
    /**
     * It represents pagination Filter array of a Paginable object
     */
    paginationFilter?: Filter<number, T>;
    /**
     * It represents number of entries of a Paginable object
     */
    entries: number;
}
