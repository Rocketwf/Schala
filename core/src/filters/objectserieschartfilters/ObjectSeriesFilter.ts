export abstract class ObjectSeriesFilter<S> {
    abstract apply(model: ObjectSeriesFilter<S>): void;
}
