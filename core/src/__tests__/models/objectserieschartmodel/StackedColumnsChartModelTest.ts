import { ViewName } from '../../../models';
import { StackedColumnsChartModel } from '../../../models/objectserieschartmodel/StackedColumnsChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: StackedColumnsChartModel = new StackedColumnsChartModel(
            'Citation by year',
            '',
            ViewName.StackedColumnsChartCard,
            6,
            [],
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
    });
});
