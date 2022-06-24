export interface Filterable<T> {
    deepCopy(): T;
    applyAllFilters(): void;
}
