import { ToFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ChartOptionsModel, Series, ViewName } from '../../../models';
import { StackedColumnsChartModel } from '../../../models/objectserieschartmodel/StackedColumnsChartModel';

let cop: ChartOptionsModel;
let model: StackedColumnsChartModel;

beforeAll(()=>
{
    const series:Series[] = [new Series('2020', [3,6,9], 'type'), new Series('2021', [5,10,15], 'type'), new Series('2022', [20,40,60], 'type'), new Series('2019', [10,20,30], 'type')];
    const objectSeriesChartModel: StackedColumnsChartModel = new StackedColumnsChartModel(
        'Most cited scholars',
        '',
        ViewName.StackedColumnsChartCard,
        6,
        series,
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
 
    const toFilter: ToFilter = new ToFilter(2020);
    const chartOptionsModel: ChartOptionsModel = new ChartOptionsModel([objectSeriesChartModel]);
    objectSeriesChartModel.chartOptionsModel=chartOptionsModel;
    toFilter.apply(objectSeriesChartModel);
    cop=chartOptionsModel;
    model=objectSeriesChartModel;
});

describe('chart options filter', () => 
{
    it('test showing filter', () => 
    {
        expect(model.series.length).toBe(2);
    });
    it('test options model equality', () =>
    {
        expect(cop).toBe(model.chartOptionsModel);
    });
});
