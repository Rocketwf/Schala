export abstract class SearchResultsFilter<S> {
    abstract apply(model: SearchResultsFilter<S>): void;
}
