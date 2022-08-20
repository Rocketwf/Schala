import { HeatmapChartModel, Series, ViewName } from '../../../models';

let heatMapChartModel: HeatmapChartModel;

beforeAll(() => 
{
    heatMapChartModel = new HeatmapChartModel('', '', ViewName.HeatmapChartCard, 8, []);
});

describe('ExpertiseModel tests', () => 
{
    it('sets and returns correct column width', () => 
    {
        const testCol: number = 10;
        heatMapChartModel.colWidth = testCol;
        expect(heatMapChartModel.colWidth).toBe(10);
    });
    it('sets and returns correct title', () => 
    {
        const testTitle: string = 'Test Title';
        heatMapChartModel.title = testTitle;
        expect(heatMapChartModel.title).toBe('Test Title');
    });
    it('sets and returns correct id', () => 
    {
        const testID: string = 'ABC123';
        heatMapChartModel.id = testID;
        expect(heatMapChartModel.id).toBe('ABC123');
    });
    it('sets and returns correct sub', () => 
    {
        const testSub: string = 'Test Sub';
        heatMapChartModel.sub = testSub;
        expect(heatMapChartModel.sub).toBe('Test Sub');
    });
    it('sets and returns correct view name', () => 
    {
        const testView: ViewName = ViewName.HeatmapChartCard;
        heatMapChartModel.viewName = testView;
        expect(heatMapChartModel.viewName).toBe(ViewName.HeatmapChartCard);
    });
    it('sets and returns correct series', () => 
    {
        const testSeries: Series[] = [new Series('Test Name', [1, 2, 3])];
        heatMapChartModel.series = testSeries;
        expect(heatMapChartModel.series).toMatchObject(testSeries);
    });
});