import { BasicBarsChartModel, Field, Series, StackedColumnsChartModel, ViewName } from '../../../models';
import { RangeButton, ShowingButton } from '../../../models/inputs/PopupEditButton';
import { FromFilter, ShowingFilter, ToFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { Filter } from '../../../filters/Filter';

let rangeButton: RangeButton;
let showingButton: ShowingButton;

describe('Range Button Filter Test', () => 
{
    it('Filter Test', () => 
    {
        const series: Array<Series> = new Array<Series>();
        series.push(new Series('2017', [10, 20, 10]));
        series.push(new Series('2018', [20, 30, 20]));
        series.push(new Series('2019', [30, 40, 30]));
        series.push(new Series('2020', [40, 50, 40]));
        series.push(new Series('2021', [50, 60, 50]));
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(2018);
        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(2020);
        const objectSeriesChartModel: StackedColumnsChartModel = new StackedColumnsChartModel(
            'Citations by Year',
            'Walter Tichy',
            ViewName.StackedColumnsChartCard,
            6,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );
        objectSeriesChartModel.filters = [fromFilter,toFilter];
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            2018,
            fromFilter,
            [objectSeriesChartModel],
        );
        const toNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'to',
            2020,
            toFilter, 
            [objectSeriesChartModel]
        );
        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        console.log(rangePopupEdit.label);
        rangePopupEdit.label='';
        rangePopupEdit.id='123321';
        rangeButton=rangePopupEdit;
        rangePopupEdit.inputs;
        rangeButton.handleAll();
        expect(objectSeriesChartModel.series.length).toBe(3);
    });
    it('Check icon', () =>
    {
        expect(rangeButton.icon).toBe('event');
    }
    );
    it('Check id', () =>
    {
        expect(rangeButton.id).toBe('123321');
    }
    );
});

describe('Article Filter Button Test', () =>
{
    it('Filter Test', () =>
    {
        const series: Array<Series> = new Array<Series>();
        series.push(new Series('Gregor Snelting', [100]));
        series.push(new Series('Walter Tichy', [150]));
        series.push(new Series('Klemens Böhm', [50]));
        series.push(new Series('Dorothea Wagner', [200]));
        series.push(new Series('Stefan Kühnlein', [300]));
        series.push(new Series('Thomas Worsch', [120]));
        const showingFilter: Filter<number, StackedColumnsChartModel> = new ShowingFilter(5);
        const objectSeriesChartModel: StackedColumnsChartModel = new StackedColumnsChartModel(
            'Citations by Year',
            'Walter Tichy',
            ViewName.StackedColumnsChartCard,
            6,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );
        objectSeriesChartModel.filters=[showingFilter];
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            5,
            showingFilter,
            [objectSeriesChartModel],
        );
        const showingPopupEdit: ShowingButton = new ShowingButton('range', [showingNumberField]);
        console.log(showingPopupEdit.label);
        showingPopupEdit.id='321123';
        showingButton = showingPopupEdit;
        showingButton.handleAll();
        showingButton.inputs;
        expect(objectSeriesChartModel.series.length).toBe(5);
    });
    it('Check icon', () =>
    {
        expect(showingButton.icon).toBe('people');
    }
    );
    it('Showing icon', () =>
    {
        showingButton.icon='event';
        expect(showingButton.icon).toBe('event');
    }
    );
    it('Check id', () =>
    {
        expect(showingButton.id).toBe('321123');
    }
    );
});
