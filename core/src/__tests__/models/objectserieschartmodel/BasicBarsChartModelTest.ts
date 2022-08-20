import { ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ChartOptionsModel, Series, ViewName } from '../../../models';
import { BasicBarsChartModel } from '../../../models/objectserieschartmodel/BasicBarsChartModel';

//let cop: ChartOptionsModel;
let model: BasicBarsChartModel;

beforeAll(()=>
{

    const serie: Series = new Series('Walter F. Tichy',[10]);
    const serie2: Series = new Series('Walter F. Tichy2',[20]);
    const serie3: Series = new Series('Walter F. Tichy3',[30]);
    const serie4: Series = new Series('Walter F. Tichy4',[40]);
    const serie5: Series = new Series('Walter F. Tichy5',[50]);

    const objectSeriesChartModel: BasicBarsChartModel = new BasicBarsChartModel(
        'Most cited scholars',
        '',
        ViewName.BasicBarsChartCard,
        6,
        [serie,serie2,serie3,serie4,serie5],
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
    const showingFilter: ShowingFilter = new ShowingFilter(1);
    objectSeriesChartModel.filters = [showingFilter];
    const chartOptionsModel:ChartOptionsModel = new ChartOptionsModel([objectSeriesChartModel]);
    objectSeriesChartModel.chartOptionsModel=chartOptionsModel;
    objectSeriesChartModel.applyAllFilters();
    
    //cop=chartOptionsModel;
    model=objectSeriesChartModel;
});

describe('chart options filter', () => 
{
    it('test showing filter', () => 
    {
        expect(model.series.length).toBe(1);
    });
});
