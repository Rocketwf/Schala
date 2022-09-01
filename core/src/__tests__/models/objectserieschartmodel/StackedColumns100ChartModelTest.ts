import { Series, ViewName } from '../../../models';
import { StackedColumns100ChartModel } from '../../../models/objectserieschartmodel/StackedColumns100ChartModel';
describe('chart options filter', () => 
{
    it('passes', () => 
    {
        const serie: Series = new Series('Walter F. Tichy',[10]);
        const serie2: Series = new Series('Walter F. Tichy2',[20]);
        const serie3: Series = new Series('Walter F. Tichy3',[30]);
        const serie4: Series = new Series('Walter F. Tichy4',[40]);
        const serie5: Series = new Series('Walter F. Tichy5',[50]);

        const stackedColumns100ChartModel: StackedColumns100ChartModel = new StackedColumns100ChartModel(
            'stackedColumns100ChartModel',
            '',
            ViewName.StackedColumns100ChartCard,
            6,
            [serie,serie2,serie3,serie4,serie5],
            '',
            '',
            ['2018','2019','2020','2021','2022']
        );
        // console.log(stackedColumns100ChartModel.deepCopy());
        expect(stackedColumns100ChartModel.deepCopy()).toEqual(stackedColumns100ChartModel);
    });
});
