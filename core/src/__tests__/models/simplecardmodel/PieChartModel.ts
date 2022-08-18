import { PieChartModel, Series, ViewName } from "../../../models"

let pieChartModel: PieChartModel;

beforeAll(() => {
    pieChartModel = new PieChartModel('', '', ViewName.PieChartCard, 8, []);
})

describe('PieChartModel tests', () => {
    it('sets and returns correct column width', () => 
    {
        let testCol: number = 10;
        pieChartModel.colWidth = testCol;
        expect(pieChartModel.colWidth).toBe(10);
    });
    it('sets and returns correct title', () => 
    {
        let testTitle: string = 'Test Title';
        pieChartModel.title = testTitle;
        expect(pieChartModel.title).toBe('Test Title');
    });
    it('sets and returns correct id', () => 
    {
        let testID: string = 'ABC123';
        pieChartModel.id = testID;
        expect(pieChartModel.id).toBe('ABC123');
    });
    it('sets and returns correct sub', () => 
    {
        let testSub: string = 'Test Sub';
        pieChartModel.sub = testSub;
        expect(pieChartModel.sub).toBe('Test Sub');
    });
    it('sets and returns correct view name', () => 
    {
        let testView: ViewName = ViewName.PieChartCard;
        pieChartModel.viewName = testView;
        expect(pieChartModel.viewName).toBe(ViewName.PieChartCard);
    });
    it('sets and returns correct series', () => 
    {
        let testSeries: Series[] = [new Series('Test Name', [1, 2, 3])];
        pieChartModel.series = testSeries;
        expect(pieChartModel.series).toMatchObject(testSeries);
    });
})