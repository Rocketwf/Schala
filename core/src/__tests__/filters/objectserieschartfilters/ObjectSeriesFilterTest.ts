import { FromFilter, ShowingFilter, ToFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { ViewName } from '../../../models';
import { StackedColumnsChartModel, ObjectSeriesChartModel, Series } from '../../../models/objectserieschartmodel';

describe('chart options filter', () => {
    let series: Series[];
    beforeEach(() => {
        series = [new Series('2020', [3]), new Series('2021', [5]), new Series('2022', [20]), new Series('2019', [10])];
    });
    it('filters charts by showing value', () => {
        const model: ObjectSeriesChartModel = new StackedColumnsChartModel(
            'citations',
            'ct',
            ViewName.PieChartCard,
            5,
            series,
            '',
            '',
            [''],
        );
        const showing: ShowingFilter = new ShowingFilter(2);
        showing.apply(model);
        expect(model.series.length).toBe(2);
    });
    it('filters charts by from value', () => {
        const model: ObjectSeriesChartModel = new StackedColumnsChartModel(
            'citations',
            'ct',
            ViewName.PieChartCard,
            5,
            series,
            '',
            '',
            [''],
        );
        const from: FromFilter = new FromFilter(2021);
        from.apply(model);
        expect(model.series[0].name).toBe('2021');
    });
    it('filters charts by to value', () => {
        const model: ObjectSeriesChartModel = new StackedColumnsChartModel(
            'citations',
            'ct',
            ViewName.PieChartCard,
            5,
            series,
            '',
            '',
            [''],
        );
        const to: ToFilter = new ToFilter(2019);
        to.apply(model);
        expect(model.series[0].name).toBe('2019');
    });
});
