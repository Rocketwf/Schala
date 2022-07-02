import { Filter } from '../../filters';
import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';
import { ViewName } from '../simplecardmodel';

/**
 * Data structure for the line columns mixed chart.
 */
export class LineColumnsMixedChartModel extends ObjectSeriesChartModel {
    /**
     * Constructs the LineColumnsMixedChartModel
     * @param _title - title of the model
     * @param _sub - subtitle of the model
     * @param _viewName - type of the model
     * @param _colWidth - width of the model
     * @param _series - data of the model
     * @param _xTitle - name of the x-axis
     * @param _yTitle - name of the y-axis
     * @param _labels - labels of the model
     */
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

    /**
     * Creates a copy of the model
     */
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
            seriesCopy,
            this.xTitle,
            this.yTitle,
            this.labels,
        );
    }

    /**
     * Applies all the filters with the current value on the cached data.
     */
    applyAllFilters(): void {
        this.filters.forEach((filter: Filter<number, ObjectSeriesChartModel>) => {
            filter.apply(this);
        });
    }
}
