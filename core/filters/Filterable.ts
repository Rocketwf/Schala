export default interface Filterable<T> {
  deepCopy(): T;
  applyAllFilters(): void;
}
