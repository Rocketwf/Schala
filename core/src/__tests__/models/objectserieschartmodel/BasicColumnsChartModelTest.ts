import { FromFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { Series, ViewName } from '../../../models';
import {BasicColumnsChartModel} from '../../../models/objectserieschartmodel/BasicColumnsChartModel';

let model: BasicColumnsChartModel;

describe('chart options filter', () => 
{
    it('check deep copy', () => 
    {
        const series:Series[] = [new Series('2020', [3,6,9], 'type'), new Series('2021', [5,10,15], 'type'), new Series('2022', [20,40,60], 'type'), new Series('2019', [10,20,30], 'type')];
        const basicColumnsChartModel: BasicColumnsChartModel = new BasicColumnsChartModel (
            'Most cited scholars',
            '',
            ViewName.BasicColumnsChartCard,
            6,
            series,
            '',
            '',
            ['2018','2019','2020','2021','2022'],
        );
        basicColumnsChartModel.deepCopy();
        const toFilter: FromFilter = new FromFilter(2020);
        toFilter.apply(basicColumnsChartModel);
        model=basicColumnsChartModel;
        expect(model.deepCopy()).not.toBe(null);
    });
    it('test showing filter', () =>
    {
        expect(model.series.length).toBe(3);
    });
});
