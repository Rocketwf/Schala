import { Filterable } from '../../filters/Filterable';

export class ArticlesModel implements Filterable<ArticlesModel> {
    deepCopy(): ArticlesModel {
        throw new Error('Method not implemented.');
    }
    applyAllFilters(): void {
        throw new Error('Method not implemented.');
    }
}
