import { ChartOptionsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ChartOptionFilter<S> extends Filter<S, ChartOptionsModel> {
    abstract apply(model: ChartOptionsModel): void;
}

export class ScaleUpFilter extends ChartOptionFilter<boolean> {
    validate(model: ChartOptionsModel): boolean {
        return true;
    }

    apply(model: ChartOptionsModel): void {
        if (this._value) {
            const limits: number[] = [];
            for (const m of model.objectSeriesChartModels) {
                for (const serie of m.series) {
                    const sum: number = serie.data.reduce((accumulator: number, current: number) => {
                        return accumulator + current;
                    }, 0);
                    limits.push(sum);
                }
            }
            model.maxLimit = Math.max(...limits);
            return;
        }
        model.maxLimit = 0;
    }
}

export class ScaleUpMixedFilter extends ChartOptionFilter<boolean> {
    private _type: TypeName;

    constructor(state: boolean, type: TypeName) {
        super(state);
        this._type = type;
    }

    validate(model: ChartOptionsModel): boolean {
        return true;
    }

    apply(model: ChartOptionsModel): void {
        if (this._value) {
            const limits: number[] = [];
            for (const m of model.objectSeriesChartModels) {
                for (const serie of m.series) {
                    if (serie.type === this.type) {
                        limits.push(serie.data[0]);
                    }
                }
            }
            if (this.type === 'column') model.maxLimit = Math.max(...limits);
            if (this.type === 'line') model.maxLimitTwo = Math.max(...limits);
            return;
        }
        if (this.type === 'column') model.maxLimit = 0;
        if (this.type === 'line') model.maxLimitTwo = 0;
    }

    public get type(): TypeName {
        return this._type;
    }
}

export enum TypeName {
    Line = 'line',
    Column = 'column',
}
