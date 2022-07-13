import { ViewName, Series, ChartOptionsModel, BasicBarsChartModel} from '../../../models';

let chartOptionsModel:ChartOptionsModel;
beforeAll(() =>
{
    const serie: Series = new Series('Walter F. Tichy',[20,30,11,42,54]);
    const objectSeriesChartModel:BasicBarsChartModel = new BasicBarsChartModel(
        'Publication by Year',
        '',
        ViewName.BasicBarsChartCard,
        6,
        [serie],
        '',
        '',
        ['2018','2019','2020','2021','2022']
    );
    const cop:ChartOptionsModel = new ChartOptionsModel([objectSeriesChartModel]);
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