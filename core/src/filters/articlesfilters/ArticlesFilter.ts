export abstract class ArticlesFilter<S> {
    abstract apply(model: ArticlesFilter<S>): void;
}
