import { ViewName } from '../simplecardmodel';
import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';

/**
 * Data structure for the 100% stacked columns chart.
 */
export class StackedColumns100ChartModel extends ObjectSeriesChartModel {
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

    applyAllFilters(): void {
        return;
    }
    deepCopy(): StackedColumns100ChartModel {
        return;
    }
}
