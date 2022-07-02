import { ScaleUpFilter } from '../../../filters/chartoptionsfilters/ChartOptionFilter';
import { ChartOptionsModel, ObjectSeriesChartModel, Series, StackedColumnsChartModel, ViewName } from '../../../models';
describe('chart options filter', () => {
    it('limits y axis of a chart to highest value ', () => {
        const series: Series[] = [
            new Series('2020', [3, 5, 50]),
            new Series('2021', [5, 70]),
            new Series('2022', [20, 35]),
            new Series('2019', [10, 3, 6, 22, 14]),
        ];
        const obj1: StackedColumnsChartModel = new StackedColumnsChartModel(
            'first',
            '',
            ViewName.ArticlesCard,
            10,
            series,
            '',
            '',
            [''],
        );
        const objects: StackedColumnsChartModel[] = [obj1];
        const model: ChartOptionsModel = new ChartOptionsModel(objects);
        const chart: ScaleUpFilter = new ScaleUpFilter(true);
        chart.apply(model);
        expect(model.maxLimit).toBe(75);
    });
});
