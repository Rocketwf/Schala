import { ViewName } from '../../../models';
import { BasicBarsChartModel } from '../../../models/objectserieschartmodel/BasicBarsChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: BasicBarsChartModel = new BasicBarsChartModel(
            'Most cited scholars',
            '',
            ViewName.BasicBarsChartCard,
            12,
            [],
            'Number of co-authored publication',
            '',
            [],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
    });
});
