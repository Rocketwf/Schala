import { Filter } from '../../filters';
import { ObjectSeriesChartModel } from '../../models';
import { Series } from '../../models/objectserieschartmodel/ObjectSeriesChartModel';

export abstract class ObjectSeriesFilter<S> extends Filter<S, ObjectSeriesChartModel> {
    abstract apply(model: ObjectSeriesChartModel): void;
}

export class FromFilter extends ObjectSeriesFilter<number> {
    apply(model: ObjectSeriesChartModel): void {
        model.series.filter((serie: Series) => +serie.name >= this.value);
    }
}

export class ToFilter extends ObjectSeriesFilter<number> {
    apply(model: ObjectSeriesChartModel): void {
        model.series.filter((serie: Series) => +serie.name <= this.value);
    }
}
