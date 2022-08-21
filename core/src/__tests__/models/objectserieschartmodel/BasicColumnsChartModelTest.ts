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
    it('sets and gets ViewName correctly', () =>
    {
        const testViewName: ViewName = ViewName.BasicBarsChartCard;
        model.viewName = testViewName;
        expect(model.viewName).toBe(ViewName.BasicBarsChartCard);
    });
    it('sets and gets xTitle correctly', () =>
    {
        const testXTitle: string = 'Test XTitle';
        model.xTitle = testXTitle;
        expect(model.xTitle).toBe('Test XTitle');
    });
    it('sets and gets yTitle correctly', () =>
    {
        const testYTitle: string = 'Test YTitle';
        model.yTitle = testYTitle;
        expect(model.yTitle).toBe('Test YTitle');
    });
    it('returns correct labels', () =>
    {
        expect(model.entries).toBe(3);
    });
    it('sets and gets isExpanded correctly', () =>
    {
        const testIsExpanded: boolean = false;
        model.isExpanded = testIsExpanded;
        expect(model.isExpanded).toBe(false);
        model.toggleExpand();
        expect(model.isExpanded).toBe(true);
    });
    it('handles isShowingExpandButton correctly', () =>
    {
        const testIsShowingExpanded: boolean = true;
        model.isShowingExpandButton = testIsShowingExpanded;
        expect(model.isShowingExpandButton).toBe(true);
        model.hideExpandButton();
        expect(model.isShowingExpandButton).toBe(false);
        model.toggleExpand();
    });
});
