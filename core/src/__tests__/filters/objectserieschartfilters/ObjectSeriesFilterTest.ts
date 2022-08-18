import { FromFilter, ToFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { Message } from '../../../misc/Message';
import { ViewName } from '../../../models';
import { StackedColumnsChartModel, ObjectSeriesChartModel, Series } from '../../../models/objectserieschartmodel';

describe('chart options filter', () => 
{
    let series: Series[];
    let model: ObjectSeriesChartModel;
    beforeEach(() => 
    {
        series = [new Series('2019', [10], 'type'), new Series('2020', [3], 'type'), new Series('2021', [5], 'type'), new Series('2022', [20], 'type')];
        model = new StackedColumnsChartModel('citations', 'ct', ViewName.StackedColumnsChartCard, 5, series, '', '', ['']);
    });
    it('filters charts by from value', () => 
    {
        const from: FromFilter = new FromFilter(2021);
        from.apply(model);
        expect(model.series[0].name).toBe('2021');
    });
    it('filters charts by to value', () => 
    {
        const to: ToFilter = new ToFilter(2019);
        to.apply(model);
        expect(model.series.length).toBe(1);
    });
    it('validates from filter model', () => 
    {
        const from: FromFilter = new FromFilter(2021);
        from.value = -1;
        const msg : Message = from.validate(model);
        expect(msg.message).toBe('Negative values aren\'t allowed');
    });
});
