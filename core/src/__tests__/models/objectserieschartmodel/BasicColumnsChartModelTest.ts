import { ViewName } from '../../../models';
import {BasicColumnsChartModel} from '../../../models/objectserieschartmodel/BasicColumnsChartModel';

describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const model: BasicColumnsChartModel = new BasicColumnsChartModel(
            'Publications by year',
            '',
            ViewName.BasicColumnsChartCard,
            6,
            [],
            'Years',
            'Number of publications',
            ['Walter Tichy'],
        );
        model.id;
        model.series;
        model.labels;
        model.colWidth;
        model.deepCopy();
    });
});
