import { Filter } from '../../filters';
import { ObjectSeriesChartModel } from '../../models';
import { Series } from '../../models/objectserieschartmodel/ObjectSeriesChartModel';

export abstract class ObjectSeriesFilter<S> extends Filter<S, ObjectSeriesChartModel> {
    abstract apply(model: ObjectSeriesChartModel): void;
}

export class FromFilter extends ObjectSeriesFilter<number> {
    validate(model: ObjectSeriesChartModel): boolean {
        if (!model.series || model.series.length === 0) {
            return false;
        }
        if (this._value >= +model.series[model.series.length - 1].name) {
            return false;
        }
        if (this._value < +model.series[0].name) {
            return false;
        }
        return true;
    }
    constructor(value: number) {
        super(value);
    }
    apply(model: ObjectSeriesChartModel): void {
        const newSeries: Series[] = new Array<Series>();
        for (const series of model.series) {
            if (+series.name >= this._value) {
                newSeries.push(series);
            }
        }
        model.series = newSeries;
    }
}

export class ToFilter extends ObjectSeriesFilter<number> {
    validate(model: ObjectSeriesChartModel): boolean {
        if (!model.series || model.series.length === 0) {
            return false;
        }
        if (this._value >= +model.series[model.series.length - 1].name) {
            return false;
        }
        if (this._value < +model.series[0].name) {
            return false;
        }
        return true;
    }
    constructor(value: number) {
        super(value);
    }
    apply(model: ObjectSeriesChartModel): void {
        const newSeries: Series[] = new Array<Series>();
        for (const series of model.series) {
            if (+series.name <= this.value) {
                newSeries.push(series);
            }
        }
        model.series = newSeries;
    }
}

export class ShowingFilter extends ObjectSeriesFilter<number> {
    constructor(value: number) {
        super(value);
    }

    validate(model: ObjectSeriesChartModel): boolean {
        if (!model.series || model.series.length === 0) {
            return false;
        }
        if (this._value >= model.series.length) {
            return false;
        }
        if (this._value <= 0) {
            return false;
        }
        return true;
    }

    apply(model: ObjectSeriesChartModel): void {
        this.validate(model);
        const newSeries: Series[] = new Array<Series>();
        if (model.series[0].type) {
            let i: number = 0;
            let end: number = 2 * this.value;
            if (end >= model.series.length) {
                end = model.series.length;
            }
            for (i = 0; i < end; ++i) {
                newSeries.push(model.series[i]);
            }
        } else {
            let i: number = 0;
            let end: number = this.value;
            if (end >= model.series.length) {
                end = model.series.length;
            }
            for (i = 0; i < end; ++i) {
                newSeries.push(model.series[i]);
            }
        }
        model.series = newSeries;
    }
}
