import { BasicBarsChartModel, Field, Series, StackedColumnsChartModel, ViewName } from '../../../models';
import { RangeButton, ShowingButton } from '../../../models/inputs/PopupEditButton';
import { FromFilter, ShowingFilter, ToFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { Filter } from '../../../filters/Filter';

let rangeButton : RangeButton;
let showingButton:ShowingButton;

describe('Range Button Filter Test', () => 
{
    it('Filter Test', () => 
    {
        const series: Array<Series> = new Array<Series>();
        series.push(new Series(2018 + '', [20, 30, 20]));
        series.push(new Series(2019 + '', [30, 40, 30]));
        series.push(new Series(2020 + '', [40, 50, 40]));
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(3);
        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(3);
        const objectSeriesChartModel: StackedColumnsChartModel = new StackedColumnsChartModel(
            'Citations by Year',
            'Walter Tichy',
            ViewName.StackedColumnsChartCard,
            6,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others']
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
        rangeButton=rangePopupEdit;

        rangeButton.handleAll();
        rangeButton.icon;
        rangeButton.label;
        rangeButton.id;
        rangeButton.inputs;
        rangeButton.id='';
        rangeButton.label='';
    });
});

describe('Article Filter Button Test', () =>
{
    it('Filter Test', () =>
    {
        const series: Array<Series> = new Array<Series>();
        series.push(new Series('Gregor Snelting', [2000]));
        const toFilter: Filter<number, BasicBarsChartModel> = new ShowingFilter(3);
        const mcs: BasicBarsChartModel = new BasicBarsChartModel(
            'Most cited scholars',
            '',
            ViewName.BasicBarsChartCard,
            6,
            series,
            'Number of citations',
            '',
            [],
        );
        mcs.filters=[toFilter];
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            3,
            toFilter,
            [mcs],
        );
        const showingPopupEdit: ShowingButton = new ShowingButton('range', [showingNumberField]);
        showingButton = showingPopupEdit;
        showingButton.handleAll();
        showingButton.icon;
        showingButton.id;
        showingButton.inputs;
        showingButton.label;
        showingButton.id='';
        showingButton.label='';
        showingButton.icon='';
    });
});
