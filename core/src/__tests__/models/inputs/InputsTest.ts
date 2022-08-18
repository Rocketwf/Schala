
import { ScaleUpFilter } from '../../../filters/chartoptionsfilters/ChartOptionFilter';
import { FromFilter, ShowingFilter } from '../../../filters/objectserieschartfilters/ObjectSeriesFilter';
import { Message, STATUS } from '../../../misc/Message';
import { ChartOptionsModel, Field, ObjectSeriesChartModel, Series, StackedColumnsChartModel, ViewName } from '../../../models';
import { CheckBox, SelectOptions } from '../../../models/inputs/Inputs';


describe('inputs test', () => 
{
    let series1: Series[];
    let series2: Series[];
    let model1: ObjectSeriesChartModel;
    let model2: ObjectSeriesChartModel;
    beforeEach(async () => 
    {
        series1 = [new Series('2020', [3]), new Series('2021', [5]), new Series('2022', [20]), new Series('2019', [10])];
        series2 = [new Series('2020', [10]), new Series('2021', [5]), new Series('2022', [30]), new Series('2019', [50])];
        model1 = new StackedColumnsChartModel('citations', 'ct', ViewName.PieChartCard, 5, series1, '', '', ['']);
        model2 = new StackedColumnsChartModel('citations', 'ct', ViewName.PieChartCard, 5, series2, '', '', ['']);
    }, 30000);
    it('checks handleInput of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        field.handleInput();
        expect(models[0].series.length).toBe(2);
    }, 30000);
    it('checks data of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        models.push(model2);
        field.data = models;
        expect(field.data).toBe(models);
    }, 30000);
    it('checks filter of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        const from: FromFilter = new FromFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        field.filter = from;
        expect(field.filter).toBe(from);
    }, 30000);
    it('checks inputName of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        field.inputName = '';
        expect(field.inputName).toBe('');
    }, 30000);
    it('checks inputId of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        field.inputId = '';
        expect(field.inputId).toBe('');
    }, 30000);
    it('checks handleInput of Checkbox', async () => 
    {
        const mods: ObjectSeriesChartModel[] = [model1, model2];
        const chartModel: ChartOptionsModel = new ChartOptionsModel(mods);
        const scale: ScaleUpFilter = new ScaleUpFilter(false);
        chartModel.filters = [scale];
        const chartMods: ChartOptionsModel[] = [chartModel];
        const check: CheckBox<ChartOptionsModel> = new CheckBox('first Diagram', true, scale, chartMods);
        check.data = chartMods;
        check.handleInput();
        expect(chartMods[0].maxLimit).toBe(50);
    }, 30000);
    it('checks inputName of Checkbox', async () => 
    {
        const mods: ObjectSeriesChartModel[] = [model1, model2];
        const chartModel: ChartOptionsModel = new ChartOptionsModel(mods);
        const scale: ScaleUpFilter = new ScaleUpFilter(false);
        chartModel.filters = [scale];
        const chartMods: ChartOptionsModel[] = [chartModel];
        const check: CheckBox<ChartOptionsModel> = new CheckBox('first Diagram',true, scale, chartMods);
        check.inputName = '';
        expect(check.inputName).toBe('');
    }, 30000);
    it('checks inputValue of Checkbox', async () => 
    {
        const mods: ObjectSeriesChartModel[] = [model1, model2];
        const chartModel: ChartOptionsModel = new ChartOptionsModel(mods);
        const scale: ScaleUpFilter = new ScaleUpFilter(false);
        chartModel.filters = [scale];
        const chartMods: ChartOptionsModel[] = [chartModel];
        const check: CheckBox<ChartOptionsModel> = new CheckBox('first Diagram',true, scale, chartMods);
        check.inputValue = false;
        expect(check.inputValue).toBe(false);
    }, 30000);
    it('checks inputName of Checkbox', async () => 
    {
        const mods: ObjectSeriesChartModel[] = [model1, model2];
        const chartModel: ChartOptionsModel = new ChartOptionsModel(mods);
        const scale: ScaleUpFilter = new ScaleUpFilter(false);
        chartModel.filters = [scale];
        const chartMods: ChartOptionsModel[] = [chartModel];
        const check: CheckBox<ChartOptionsModel> = new CheckBox('first Diagram',true, scale, chartMods);
        check.inputId = '';
        expect(check.inputId).toBe('');
    }, 30000);
    it('checks filter of Checkbox', async () => 
    {
        const mods: ObjectSeriesChartModel[] = [model1, model2];
        const chartModel: ChartOptionsModel = new ChartOptionsModel(mods);
        const scale1: ScaleUpFilter = new ScaleUpFilter(true);
        const scale2: ScaleUpFilter = new ScaleUpFilter(false);
        chartModel.filters = [scale1];
        const chartMods: ChartOptionsModel[] = [chartModel];
        const check: CheckBox<ChartOptionsModel> = new CheckBox('first Article',true, scale1, chartMods);
        check.filter = scale2;
        expect(check.filter).toBe(scale2);
    }, 30000);
    it('checks handleInput of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        select.handleInput();
        expect(models[0].series.length).toBe(2);
    }, 30000);
    it('checks data of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        models.push(model2);
        select.data = models;
        expect(select.data).toBe(models);
    }, 30000);
    it('checks filter of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        const from: FromFilter = new FromFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        select.filter = from;
        expect(select.filter).toBe(from);
    }, 30000);
    it('checks inputName of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        select.inputName = '';
        expect(select.inputName).toBe('');
    }, 30000);
    it('checks inputId of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        select.inputId = '';
        expect(select.inputId).toBe('');
    }, 30000);
    it('checks inputValue of SelectOptions', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const select: SelectOptions<number, ObjectSeriesChartModel> = new SelectOptions('first Article',2, [2,3],showing, models);
        select.inputValue = 1;
        expect(select.inputValue).toBe(1);
    }, 30000);
    it('checks if previous value equal to current value of Field', async () => 
    {
        const showing: ShowingFilter = new ShowingFilter(2);
        model1.filters = [showing];
        const models: ObjectSeriesChartModel[] = [model1];
        const field: Field<number, ObjectSeriesChartModel> = new Field('first Article',2, showing, models);
        field.handleInput();
        field.inputValue = 2;
        const msg: Message[] = field.handleInput();
        expect(msg[0].status).toBe(STATUS.OK);
    }, 30000);
});