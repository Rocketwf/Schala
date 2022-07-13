import { ViewName } from '../../../models';
import { StackedColumns100ChartModel } from '../../../models/objectserieschartmodel/StackedColumns100ChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: StackedColumns100ChartModel = new StackedColumns100ChartModel(
            'Citations by year',
            '',
            ViewName.StackedColumns100ChartCard,
            6,
            [],
            'Scholar Names',
            '',
            [],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
        model.deepCopy();
    });
});
