import { Filter } from '../../filters';
import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';
import { ViewName } from '../simplecardmodel';

export class LineColumnsMixedChartModel extends ObjectSeriesChartModel {
    constructor(
        _title: string,
        _sub: string,
        _viewName: ViewName,
        _colWidth: number,
        _series: Array<Series>,
        _xTitle: string,
        _yTitle: string,
        _labels: string[],
    ) {
        super(_title, _sub, _viewName, _colWidth, _series, _xTitle, _yTitle, _labels);
    }

    deepCopy(): ObjectSeriesChartModel {
        const seriesCopy: Array<Series> = new Array<Series>();
        this.series.forEach((serie: Series) => {
            seriesCopy.push(new Series(serie.name, serie.data));
        });
        return new LineColumnsMixedChartModel(
            this.title,
            this.sub,
            this.viewName,
            this.colWidth,
            this.series,
            this.xTitle,
            this.yTitle,
            this.labels,
        );
    }

    applyAllFilters(): void {
        this.filters.forEach((filter: Filter<number, ObjectSeriesChartModel>) => {
            filter.apply(this);
        });
    }
}
