import { Filter } from '../../filters';
import { ViewName } from '../simplecardmodel';
import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';

export class StackedColumns100ChartModel extends ObjectSeriesChartModel {
    constructor(_title: string, _sub: string, _viewName: ViewName, _colWidth: number, _series: Array<Series>) {
        super(_title, _sub, _viewName, _colWidth, _series);
    }

    deepCopy(): ObjectSeriesChartModel {
        const seriesCopy: Array<Series> = new Array<Series>();
        this.series.forEach((serie: Series) => {
            seriesCopy.push(new Series(serie.name, serie.data));
        });
        return new StackedColumns100ChartModel(this.title, this.sub, this.viewName, this.colWidth, this.series);
    }

    applyAllFilters(): void {
        this.filters.forEach((filter: Filter<number, ObjectSeriesChartModel>) => {
            filter.apply(this);
        });
    }
}
