import { SimpleCardModel, ViewName } from '../simplecardmodel';
import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';

/**
 * Data structure for the stacked columns chart.
 */
export class StackedColumnsChartModel extends ObjectSeriesChartModel implements SimpleCardModel 
{
    constructor(
        _title: string,
        _sub: string,
        _viewName: ViewName,
        _colWidth: number,
        _series: Array<Series>,
        _xTitle: string,
        _yTitle: string,
        _labels: string[],
    ) 
    {
        super(_title, _sub, _viewName, _colWidth, _series, _xTitle, _yTitle, _labels);
    }

    /**
     * Creates a carbon copy of the model.
     * @returns the created copy as StackedColumnsChartModel
     */
    deepCopy(): StackedColumnsChartModel 
    {
        const seriesCopy: Array<Series> = new Array<Series>();
        this.series.forEach((serie: Series) => 
        {
            seriesCopy.push(new Series(serie.name, serie.data));
        });
        return new StackedColumnsChartModel(
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
}
