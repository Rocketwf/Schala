export interface Filterable<T extends Filterable<T>> {
    deepCopy(): T;
    applyAllFilters(): void;
}
