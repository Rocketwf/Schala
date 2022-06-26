import { SimpleCardModel } from './simpleCardModel';

export class PieChartModel implements SimpleCardModel {
    colWidth: number = 370;
    title: string = 'Citations';
    sub: string = '';
    applyAllFilters = (): void => {
        return;
    };
}
