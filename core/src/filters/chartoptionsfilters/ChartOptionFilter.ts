export abstract class ChartOptionFilter<S> {
    abstract apply(model: ChartOptionFilter<S>): void;
}
