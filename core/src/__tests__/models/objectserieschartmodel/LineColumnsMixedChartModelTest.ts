import { ViewName } from '../../../models';
import { LineColumnsMixedChartModel } from '../../../models/objectserieschartmodel/LineColumnsMixedChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
            '',
            'Walter Tichy',
            ViewName.LineColumnsMixedChartCard,
            12,
            [],
            'h-index',
            'Publications',
            ['Publications', 'h-index'],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
    });

});
