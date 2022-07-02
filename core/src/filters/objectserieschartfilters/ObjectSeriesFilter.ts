import { Filter } from '../../filters';
import { ObjectSeriesChartModel } from '../../models';
import { Series } from '../../models/objectserieschartmodel/ObjectSeriesChartModel';

export abstract class ObjectSeriesFilter<S> extends Filter<S, ObjectSeriesChartModel> {
    abstract apply(model: ObjectSeriesChartModel): void;
}

export class FromFilter extends ObjectSeriesFilter<number> {
    constructor(value: number) {
        super(value);
    }
    apply(model: ObjectSeriesChartModel): void {
        const newSeries: Series[] = model.series.filter((serie: Series) => +serie.name >= this.value);
        model.series = newSeries;
    }
}

export class ToFilter extends ObjectSeriesFilter<number> {
    constructor(value: number) {
        super(value);
    }
    apply(model: ObjectSeriesChartModel): void {
        const newSeries: Series[] = model.series.filter((serie: Series) => +serie.name <= this.value);
        model.series = newSeries;
        console.log(newSeries);
    }
}

export class ShowingFilter extends ObjectSeriesFilter<number> {
    constructor(value: number) {
        super(value);
    }
    apply(model: ObjectSeriesChartModel): void {
        const newSeries: Series[] = model.series.slice(0, this.value);
        model.series = newSeries;
    }
}
