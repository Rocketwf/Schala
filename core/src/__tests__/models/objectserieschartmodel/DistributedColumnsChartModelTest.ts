import { ViewName } from '../../../models';
import { DistributedColumnsChartModel } from '../../../models/objectserieschartmodel/DistributedColumnsChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            'Publications by venue',
            'Walter Tichy',
            ViewName.DistributedColumnsChartCard,
            12,
            [],
            'Venues',
            'Number of publications',
            [],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
    });
});
