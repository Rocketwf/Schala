import { ViewName } from '../../../models';
import { ObjectSeriesChartModel,BasicBarsChartModel, Series} from '../../../models/objectserieschartmodel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const serie: Series = new Series('Walter F. Tichy',[20,30,11,42,54]);
        
        const objectSeriesChartModel:ObjectSeriesChartModel = new BasicBarsChartModel(
            'Publication by Year',
            '',
            ViewName.BasicBarsChartCard,
            6,
            [serie],
            '',
            '',
            ['2018','2019','2020','2021','2022']
        );
        objectSeriesChartModel.chartOptionsModel = null;
    });
});
