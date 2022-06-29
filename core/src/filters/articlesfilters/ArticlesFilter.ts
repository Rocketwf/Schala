import { ArticlesModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ArticlesFilter<S> extends Filter<S, ArticlesModel> {
    abstract apply(model: ArticlesModel): void;
}

export class ArticlesPaginationFilter extends ArticlesFilter<number> {
    private _hitsPerPage: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    public set hitsPerPage(newHitsPerPage: number) {
        this._hitsPerPage = newHitsPerPage;
    }

    apply(model: ArticlesModel): void {
        model.articles = model.articles.slice(
            (this.value - 1) * this._hitsPerPage,
            (this.value - 1) * this._hitsPerPage + this._hitsPerPage,
        );
    }
}
