import { ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ChartOptionsModel, Series, ViewName } from '../../../models';
import { LineColumnsMixedChartModel } from '../../../models/objectserieschartmodel/LineColumnsMixedChartModel';

let cop: ChartOptionsModel;
let lineColumnsMixedChartModel: LineColumnsMixedChartModel;

beforeAll(()=>
{
    const series: Array<Series> = new Array<Series>();
    series.push(new Series('Walter F. Tichy', [5], 'line'));
    series.push(new Series('Walter F. Tichy', [100], 'column'));
    series.push(new Series('Walter F. Tichy2', [10], 'line'));
    series.push(new Series('Walter F. Tichy2', [200], 'column'));
    series.push(new Series('Walter F. Tichy3', [15], 'line'));
    series.push(new Series('Walter F. Tichy3', [300], 'column'));
    series.push(new Series('Walter F. Tichy4', [20], 'line'));
    series.push(new Series('Walter F. Tichy4', [400], 'column'));

    const model: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
        '',
        '',
        ViewName.LineColumnsMixedChartCard,
        6,
        series,
        'h-index',
        'Publications',
        ['Publications', 'h-index'],
    );
    const showingFilter: ShowingFilter = new ShowingFilter(2);
    model.filters = [showingFilter];
    const chartOptionsModel:ChartOptionsModel = new ChartOptionsModel([model]);
    model.chartOptionsModel=chartOptionsModel;
    model.applyAllFilters();
    cop=chartOptionsModel;
    lineColumnsMixedChartModel=model;
});

describe('line columns mixed chart model', () => 
{
    it('test showing filter', () => 
    {
        expect(lineColumnsMixedChartModel.series.length/2).toBe(2);
    });
    it('test options model equality', () =>
    {
        expect(cop).toBe(lineColumnsMixedChartModel.chartOptionsModel);
    });
});
