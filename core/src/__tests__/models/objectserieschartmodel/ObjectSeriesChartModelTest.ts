import { ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ChartOptionsModel, ViewName } from '../../../models';
import { BasicBarsChartModel, ObjectSeriesChartModel, Series} from '../../../models/objectserieschartmodel';

let oscm: BasicBarsChartModel;
let cop:ChartOptionsModel;

beforeAll(()=>
{

    const serie: Series = new Series('Walter F. Tichy',[10,20,30,40,50]);
    const serie2: Series = new Series('Walter F. Tichy2',[10,20,30,40,50]);
    const serie3: Series = new Series('Walter F. Tichy3',[10,20,30,40,50]);
    const serie4: Series = new Series('Walter F. Tichy4',[10,20,30,40,50]);
    const serie5: Series = new Series('Walter F. Tichy5',[10,20,30,40,50]);

    const objectSeriesChartModel: ObjectSeriesChartModel = new BasicBarsChartModel(
        'Publication by Year',
        '',
        ViewName.BasicBarsChartCard,
        6,
        [serie,serie2,serie3,serie4,serie5],
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
    const showingFilter: ShowingFilter = new ShowingFilter(3);
    objectSeriesChartModel.filters = [showingFilter];
    const chartOptionsModel:ChartOptionsModel = new ChartOptionsModel([objectSeriesChartModel]);
    objectSeriesChartModel.chartOptionsModel=chartOptionsModel;
    objectSeriesChartModel.applyAllFilters();
    
    cop=chartOptionsModel;
    oscm=objectSeriesChartModel;
});

describe('object series chart model test', () => 
{
    it('test showing filter', () => 
    {
        expect(oscm.series.length).toBe(3); 
    });
    it('test options model equality', () =>
    {
        expect(cop).toBe(oscm.chartOptionsModel);
    });
});
