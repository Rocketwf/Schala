import { ChartOptionsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ChartOptionFilter<S> extends Filter<S, ChartOptionsModel> {
    abstract apply(model: ChartOptionsModel): void;
}

export class ScaleUpFilter extends ChartOptionFilter<boolean> {
    validate(model: ChartOptionsModel): boolean {
        throw new Error('Method not implemented.');
    }
    apply(model: ChartOptionsModel): void {
        if (this.value) {
            const limits: number[] = [];
            for (const m of model.objectSeriesChartModels) {
                for (const serie of m.series) {
                    console.log(serie.data);
                    const sum: number = serie.data.reduce((accumulator: number, current: number) => {
                        return accumulator + current;
                    }, 0);
                    limits.push(sum);
                }
            }
            model.maxLimit = Math.max(...limits);
        }
    }
}
