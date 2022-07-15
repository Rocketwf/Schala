import { ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ChartOptionsModel, Series, ViewName } from '../../../models';
import { DistributedColumnsChartModel } from '../../../models/objectserieschartmodel/DistributedColumnsChartModel';

let cop: ChartOptionsModel;
let model: DistributedColumnsChartModel;

beforeAll(()=>
{
    const serie: Series = new Series('Walter F. Tichy',[10]);
    const serie2: Series = new Series('Walter F. Tichy2',[20]);
    const serie3: Series = new Series('Walter F. Tichy3',[30]);
    const serie4: Series = new Series('Walter F. Tichy4',[40]);
    const serie5: Series = new Series('Walter F. Tichy5',[50]);

    const objectSeriesChartModel: DistributedColumnsChartModel = new DistributedColumnsChartModel(
        'Publication by Year',
        '',
        ViewName.BasicBarsChartCard,
        6,
        [serie,serie2,serie3,serie4,serie5],
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
    const showingFilter: ShowingFilter = new ShowingFilter(2);
    objectSeriesChartModel.filters = [showingFilter];
    const chartOptionsModel:ChartOptionsModel = new ChartOptionsModel([objectSeriesChartModel]);
    objectSeriesChartModel.chartOptionsModel=chartOptionsModel;
    objectSeriesChartModel.applyAllFilters();
    
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
