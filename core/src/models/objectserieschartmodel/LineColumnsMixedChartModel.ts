import { ObjectSeriesChartModel, Series } from './ObjectSeriesChartModel';
import { SimpleCardModel, ViewName } from '../simplecardmodel';

/**
 * Data structure for the line columns mixed chart.
 */
export class LineColumnsMixedChartModel extends ObjectSeriesChartModel implements SimpleCardModel {
    /**
     * Creates an instance of BasicBarsChartModel.
     * @param _title - Represents the title value as a string
     * @param _sub - Represents the subtitle value as a string
     * @param _viewName - Represents the view name value as a ViewName
     * @param _colWidth - Represents the column width value as a number
     * @param _series - Represents the series value as a series array
     * @param _xTitle - Represents the x-axis title value as a string
     * @param _yTitle - Represents the y-axis title value as a string
     * @param _labels - Represents the labels value as a string array
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
     * Creates a carbon copy of the model.
     * @returns the created copy as LineColumnsMixedChartModel
     */
    deepCopy(): LineColumnsMixedChartModel {
        const seriesCopy: Array<Series> = new Array<Series>();
        this.series.forEach((serie: Series) => {
            seriesCopy.push(new Series(serie.name, serie.data, serie.type));
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
}
