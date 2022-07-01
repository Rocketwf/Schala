import { ChartOptionsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ChartOptionFilter<S> extends Filter<S, ChartOptionsModel> {
    abstract apply(model: ChartOptionsModel): void;
}

export class ScaleUpFilter extends ChartOptionFilter<boolean> {
    apply(model: ChartOptionsModel): void {
        if (this.value) {
            const limits: number[] = [];
            for (const serie of model.series) {
                console.log(serie.data);
                const sum: number = serie.data.reduce((accumulator: number, current: number) => {
                    return accumulator + current;
                }, 0);
                limits.push(sum);
            }
            model.maxLimit = Math.max(...limits);
        }
    }
}
