import { ScaleUpFilter, ScaleUpMixedFilter, TypeName } from '../../../filters/chartoptionsfilters/ChartOptionFilter';
import { ChartOptionsModel, Series, StackedColumnsChartModel, ViewName, LineColumnsMixedChartModel } from '../../../models';
describe('chart options filter', () => 
{
    it('limits y axis of a chart to highest value ', () => 
    {
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
        expect(model.maxLimit == 75 && chart.validate(model)).toBe(true);
    });
});

describe('mixed chart options filter', () => 
{
    it('limits y axis of a mixed chart to highest h-index ', () => 
    {
        const series: Array<Series> = new Array<Series>();
        series.push(new Series('Gregor Snelting', [31], 'line'));
        series.push(new Series('Gregor Snelting', [140], 'column'));
        series.push(new Series('Walter Tichy', [65], 'line'));
        series.push(new Series('Walter Tichy', [273], 'column'));
        series.push(new Series('Georgios Zervakis', [40], 'line'));
        series.push(new Series('Georgios Zervakis', [60], 'column'));
        series.push(new Series('Om Prakash', [20], 'line'));        
        series.push(new Series('Om Prakash', [20], 'column'));
        
        const obj2: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
            'second',
            '',
            ViewName.LineColumnsMixedChartCard,
            10,
            series,
            '',
            '',
            [''],
        );
        const objects: LineColumnsMixedChartModel[] = [obj2];
        const model: ChartOptionsModel = new ChartOptionsModel(objects);
        const chart: ScaleUpMixedFilter = new ScaleUpMixedFilter(true,TypeName.Line);
        chart.apply(model);
        expect(model.maxLimitTwo == 65 && chart.validate(model)).toBe(true);
    });
});
