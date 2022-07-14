import { ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ViewName, Series, ChartOptionsModel, BasicBarsChartModel} from '../../../models';

let chartOptionsModel:ChartOptionsModel;
let objectSeriesChartModel: BasicBarsChartModel;
beforeAll(() =>
{
    const serie: Series = new Series('Gregor Snelting',[20]);
    const serie2: Series = new Series('Klemens Böhm',[30]);
    const serie3: Series = new Series('Dorothea Wagner',[40]);
    const serie4: Series = new Series('Anne Koziolek',[50]);
    const oscm: BasicBarsChartModel = new BasicBarsChartModel(
        'Publication by Year',
        '',
        ViewName.BasicBarsChartCard,
        6,
        [serie,serie2,serie3,serie4],
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
    const cop:ChartOptionsModel = new ChartOptionsModel([oscm]);
    const showingFilter: ShowingFilter = new ShowingFilter(2);
    showingFilter.apply(oscm);
    objectSeriesChartModel=oscm;
    chartOptionsModel=cop;
}
);

describe('check deep copy', () => 
{
    it('deep copy', () => 
    {
        expect(chartOptionsModel.deepCopy()).toEqual(chartOptionsModel);        
    });
});

describe('chart options model', () =>
{
    it('entries', () =>
    {
        expect(chartOptionsModel.entries).toBe(1);
    }
    );
});

describe('check showing filter', () =>
{
    it('toBe 2', () =>
    {
        expect(objectSeriesChartModel.series.length).toBe(2);
    }
    );
});
